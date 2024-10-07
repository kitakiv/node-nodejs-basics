import { Transform, pipeline } from 'stream';
import process from 'process';

const transform = async () => {
    const readStream = process.stdin;
    const writeStream = process.stdout;
    readStream.on('data', (chunk) => {
        const chunkStringified = chunk.toString().trim();
        if (chunkStringified.includes('CLOSE')) process.exit(0);
    })
    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            const chunkStringified = chunk.toString().trim();
            const reverseChunk = chunkStringified.split('').reverse().join('');
            callback(null, reverseChunk + '\n');
        }
    });
    pipeline(readStream, transformStream, writeStream, (err) => {
        if (err) {
            console.log(err);
        }
    })
};

await transform();