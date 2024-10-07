import os from 'node:os';
import { Worker } from 'node:worker_threads';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
    const filePath = path.join(__dirname, 'worker.js');
    const numCPUs = os.cpus().length;
    const results = Array.from({ length: numCPUs }, (v, k) => k + 10);
    const promises = results.map((result) => new Promise((resolve) => {
        const worker = new Worker(filePath);
        worker.postMessage(result);
        worker.on('message', (num) => {
            resolve(num);
        });
    }));
    Promise.all(promises).then((values) => {
        console.log(values);
    });
};

await performCalculations();