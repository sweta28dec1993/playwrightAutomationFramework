import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { APIClient } from './apiClient';

export interface ApiTestCase {
    name: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    endpoint: string;
    payload?: any;
    expected_status: number;
    assertions?: string[];
}


export function runApiTestsFromYaml(filePath: string) {
    let fileContents: string;
    let testCases: ApiTestCase[];

    try {
        fileContents = fs.readFileSync(filePath, 'utf8');
        testCases = yaml.load(fileContents) as ApiTestCase[];
    } catch (error) {
        console.error(`Error reading or parsing YAML file ${filePath}:`, error);
        return;
    }

    const apiName = filePath.split(/[\\/]/).pop()?.replace('.yaml', '') || 'API';

    for (const testCase of testCases) {
        test(`[${apiName}] ${testCase.name}`, async ({ request }) => {
            const apiClient = new APIClient(request);
            let response;

            console.log(`Executing test: ${testCase.name} - ${testCase.method} ${testCase.endpoint}`);

            switch (testCase.method.toUpperCase()) {
                case 'GET':
                    response = await apiClient.get(testCase.endpoint);
                    break;
                case 'POST':
                    response = await apiClient.post(testCase.endpoint, testCase.payload);
                    break;
                case 'PUT':
                    response = await apiClient.put(testCase.endpoint, testCase.payload);
                    break;
                case 'PATCH':
                    console.log(`[APIClient] PATCH ${testCase.endpoint} - Payload: ${JSON.stringify(testCase.payload)}`);
                    response = await request.patch(testCase.endpoint, { data: testCase.payload });
                    break;
                case 'DELETE':
                    response = await apiClient.delete(testCase.endpoint);
                    break;
                default:
                    throw new Error(`Unsupported method: ${testCase.method}`);
            }

            expect(response.status(), `Status code should be ${testCase.expected_status}`).toBe(testCase.expected_status);

            let responseBody;
            try {
                responseBody = await response.json();
            } catch (e) {
                responseBody = await response.text();
            }

            const responseData = { response: responseBody };

            if (testCase.assertions && testCase.assertions.length > 0) {
                for (const assertion of testCase.assertions) {
                    evaluateAssertion(responseData, assertion, testCase.name);
                }
            }
        });
    }
}


function evaluateAssertion(data: any, assertionStr: string, testName: string) {
    const match = assertionStr.match(/(.+?)\s*(==|!=|>=|<=|>|<|contains)\s*(.+)/);
    if (!match) {
        throw new Error(`Invalid assertion format: "${assertionStr}" in test "${testName}"`);
    }
    const leftSide = match[1].trim();
    const operator = match[2].trim();
    let rightSideStr = match[3].trim();

    let rightSide: any;
    if ((rightSideStr.startsWith("'") && rightSideStr.endsWith("'")) || (rightSideStr.startsWith('"') && rightSideStr.endsWith('"'))) {
        rightSide = rightSideStr.slice(1, -1);
    } else if (rightSideStr === 'true') {
        rightSide = true;
    } else if (rightSideStr === 'false') {
        rightSide = false;
    } else if (rightSideStr === 'null') {
        rightSide = null;
    } else if (!isNaN(Number(rightSideStr))) {
        rightSide = Number(rightSideStr);
    } else {
        rightSide = rightSideStr; 
    }

    let leftValue: any = data;
    const pathParts = leftSide.split('.');
    for (const part of pathParts) {
        if (leftValue === undefined || leftValue === null) break;

        const arrayMatch = part.match(/(.+?)\[(\d+)\]/);
        if (arrayMatch) {
            leftValue = leftValue[arrayMatch[1]][parseInt(arrayMatch[2], 10)];
        } else {
            leftValue = leftValue[part];
        }
    }

    switch (operator) {
        case '==':
            expect(leftValue, `Assertion failed: ${assertionStr}`).toEqual(rightSide);
            break;
        case '!=':
            expect(leftValue, `Assertion failed: ${assertionStr}`).not.toEqual(rightSide);
            break;
        case '>':
            expect(leftValue, `Assertion failed: ${assertionStr}`).toBeGreaterThan(rightSide);
            break;
        case '<':
            expect(leftValue, `Assertion failed: ${assertionStr}`).toBeLessThan(rightSide);
            break;
        case '>=':
            expect(leftValue, `Assertion failed: ${assertionStr}`).toBeGreaterThanOrEqual(rightSide);
            break;
        case '<=':
            expect(leftValue, `Assertion failed: ${assertionStr}`).toBeLessThanOrEqual(rightSide);
            break;
        case 'contains':
            expect(leftValue, `Assertion failed: ${assertionStr}`).toContain(rightSide);
            break;
        default:
            throw new Error(`Unsupported operator: ${operator}`);
    }
}
