import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'path';
import process from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
    const writeStream = fs.createWriteStream(filePath, { encoding: 'utf8' });
    process.stdin.pipe(writeStream);

    writeStream.on('error', (err) => {
        console.log(err);
    });
};

await write();