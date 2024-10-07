import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
    const childPath = path.join(__dirname, 'files', 'script.js');

    const child = spawn('node', [childPath, ...args]);

    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);

    child.on('error', (err) => {
        console.error(err);
    });

    child.on('message', (message) => {
        console.log(message);
    })
};

spawnChildProcess( ['arg', 'arg1'] );
