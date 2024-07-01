const { executeScript } = require('../services/scriptExecutor');

describe('Script Executor', () => {
    it('should execute NodeJS script', async () => {
        const result = await executeScript('nodejs', "console.log('hello world')");
        expect(result.output.trim()).toBe('hello world');
    });

    it('should execute Python script', async () => {
        const result = await executeScript('python', "print('hello world')");
        expect(result.output.trim()).toBe('hello world');
    });

    it('should execute Ruby script', async () => {
        const result = await executeScript('ruby', "puts 'hello world'");
        expect(result.output.trim()).toBe('hello world');
    });

    it('should execute Java script', async () => {
        const javaScript = `
            public class Main {
                public static void main(String[] args) {
                    System.out.println("hello world");
                }
            }
        `;
        const result = await executeScript('java', javaScript);
        expect(result.output.trim()).toBe('hello world');
    });
});
