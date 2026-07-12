import { exec } from "child_process";
import logger from "../../config/logger";

export function runCode(command: string) {
    return new Promise((resolve) => {

        exec(command, (err, stdout, stderr) => {
            // ---------------- Runtime Errors ----------------
            if (err) {

                const code = (err as any).code;
                logger.error(err)
                switch (code) {
                    // timeout command
                    case 124:
                        resolve({
                            message: "TLE",
                            output: ""
                        });
                        return;
                    // Docker OOM Kill
                    case 137:
                        resolve({
                            message: "Memory Limit Exceeded",
                            output: "Memory Limit Exceeded"
                        });
                        return;

                    // SIGFPE
                    case 136:
                        resolve({
                            message: "Runtime Error",
                            output: "Floating Point Exception"
                        });
                        return;

                    // SIGSEGV
                    case 139:
                        resolve({
                            message: "Runtime Error",
                            output: "Segmentation Fault"
                        });
                        return;

                    // SIGABRT
                    case 134:
                        resolve({
                            message: "Runtime Error",
                            output: "Program Aborted"
                        });
                        return;

                    // SIGILL
                    case 132:
                        resolve({
                            message: "Runtime Error",
                            output: "Illegal Instruction"
                        });
                        return;
                }

                // Python / Java / Node runtime exceptions
                if (stderr.trim().length > 0) {
                    resolve({
                        message: "Runtime Error",
                        output: stderr.trim()
                    });
                    return;
                }

                // Example:
                // return 1;
                // return 42;
                // These are NOT runtime errors.
                resolve({
                    message: "Accepted",
                    output: stdout
                });
                return;
            }

            // Some interpreters write errors only to stderr
            if (stderr.trim().length > 0) {
                resolve({
                    message: "Runtime Error",
                    output: stderr.trim()
                });
                return;
            }

            resolve({
                message: "Accepted",
                output: stdout
            });

        });

    });
}