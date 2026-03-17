import * as dotenv from 'dotenv';
import fs from 'fs';

const ENV = process.env.ENV || 'staging';
dotenv.config({ path: `.env.${ENV}` })

const config = JSON.parse(fs.readFileSync(`resources/${ENV}.json`, 'utf-8'));
const envConfig = { ...process.env, ...config };
if(!envConfig) throw new Error(`No configuration found for environment: ${ENV}`);

export const configLoader = { ...envConfig };