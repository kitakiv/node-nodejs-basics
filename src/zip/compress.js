import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createWriteStream, createReadStream } from 'node:fs';
import {fileURLToPath} from 'url';
import path, {dirname} from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const compress = async () => {
    const fileToCompress = path.join(__dirname, 'files', 'fileToCompress.txt');
    const gzipFile = path.join(__dirname, 'files', 'archive.gz');

    const gzip = createGzip();
    const source = createReadStream(fileToCompress);
    const destination = createWriteStream(gzipFile, { encoding: 'utf8' });
    pipeline(source, gzip, destination, (err) => {
        if (err) {
            console.error('An error occurred:', err);
            process.exitCode = 1;
        } else {
            fs.unlink(fileToCompress, (err) => {
                if (err) {
                    console.error('An error occurred:', err);
                    process.exitCode = 1;
                }
            });
        }
    });

};

await compress();