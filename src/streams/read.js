import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {

    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
    readStream.on('data', (chunk) => {
        process.stdout.write(`${chunk.toString()} \n`);
    });

};

await read();