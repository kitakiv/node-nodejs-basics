import { createUnzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createWriteStream, createReadStream } from 'node:fs';
import {fileURLToPath} from 'url';
import path, {dirname} from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const decompress = async () => {
    const gzipFile = path.join(__dirname, 'files', 'fileToCompress.txt');
    const fileToDecompress = path.join(__dirname, 'files', 'archive.gz');

    const gzip = createUnzip();
    const source = createReadStream(fileToDecompress);
    const destination = createWriteStream(gzipFile);
    pipeline(source, gzip, destination, (err) => {
        if (err) {
            console.error('An error occurred:', err);
            process.exitCode = 1;
        } else {
            fs.unlink(fileToDecompress, (err) => {
                if (err) {
                    console.error('An error occurred:', err);
                    process.exitCode = 1;
                }
            });
        }
    });
};

await decompress();