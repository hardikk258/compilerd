const { exec } = require('child_process');

const executeScript = (language, script) => {
    return new Promise((resolve, reject) => {
        let command;

        switch (language.toLowerCase()) {
            case 'nodejs':
                command = `node -e "${script}"`;
                break;
            case 'python':
                command = `python3 -c "${script}"`;
                break;
            case 'ruby':
                command = `ruby -e "${script}"`;
                break;
            case 'java':
                // For Java, we'll assume the script is a full class definition
                const javaFileName = 'Main.java';
                require('fs').writeFileSync(javaFileName, script);
                command = `javac ${javaFileName} && java Main`;
                break;
            default:
                return reject(new Error(`Unsupported language: ${language}`));
        }

        exec(command, (error, stdout, stderr) => {
            if (error) {
                return reject(stderr || error.message);
            }
            resolve({
                output: stdout,
                execute_time: null,
                status_code: 200,
                memory: null,
                cpu_time: null,
                output_files: [],
                compile_message: "",
                error: 0
            });
        });
    });
};

module.exports = { executeScript };
