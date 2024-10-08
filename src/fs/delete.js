import { rm } from 'fs/promises';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');

const remove = async () => {
    fs.stat(filePath, async (err, stats) => {
        if (err) {
            throw new Error('FS operation failed');
        }
        if (stats.isFile()) {
            await rm(filePath);
        }
    })
};

await remove();