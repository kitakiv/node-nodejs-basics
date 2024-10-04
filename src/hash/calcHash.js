import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';
const { createHash } = await import('node:crypto');
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { create } from 'node:domain';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    const hash = createHash('SHA256');

    createReadStream(filePath, { encoding: 'utf8' })
        .on('data', (data) => {
            hash.update(data);
        })
        .on('end', () => {
            console.log(hash.digest('hex'));
        });
};

await calculateHash();