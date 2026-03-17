// import * as dotenv from 'dotenv';
// import fs from 'fs';
// import path from 'path';

// const VALID_ENVIRONMENTS = ['staging', 'production', 'dev'];

// const ENV = process.env.ENV || 'staging';

// if (!VALID_ENVIRONMENTS.includes(ENV)) {
//     throw new Error(`Invalid environment: "${ENV}". Allowed values: ${VALID_ENVIRONMENTS.join(', ')}`);
// }

// try {
//     dotenv.config({ path: `.env.${ENV}` });
// } catch (error) {
//     throw new Error(`Failed to load .env file for ${ENV}: ${error instanceof Error ? error.message : String(error)}`);
// }

// const configPath = path.join('resources', `${ENV}.json`);
// if (!fs.existsSync(configPath)) {
//     throw new Error(`Configuration file not found: ${configPath}`);
// }

// let config: any;
// try {
//     config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
// } catch (error) {
//     throw new Error(`Failed to parse JSON config at ${configPath}: ${error instanceof Error ? error.message : String(error)}`);
// }

// const REQUIRED_KEYS = ['BASE_URL', 'USERNAME', 'PASSWORD', 'API_KEY'];
// const missingKeys = REQUIRED_KEYS.filter(key => !(key in config));
// if (missingKeys.length > 0) {
//     throw new Error(`Missing required configuration keys in ${configPath}: ${missingKeys.join(', ')}`);
// }

// const envConfig = { ...process.env, ...config };

// export const configLoader = { ...envConfig };