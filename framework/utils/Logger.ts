/**
 * A simple logger utility to standardize logging output during test execution.
 */
export class Logger {
    static info(message: string): void {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    }

    static error(message: string, error?: any): void {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error || '');
    }

    static step(stepDescription: string): void {
        console.log(`[STEP] ===> ${stepDescription}`);
    }
}
