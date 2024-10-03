import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                throw new Error('FS operation failed');
            }
            console.log(err);
            return;
        }
        console.log(data);
    });
};

await read();