import { parentPort } from 'worker_threads';

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
        let number;
        parentPort.on('message', (n) => {
            try {
                number = nthFibonacci(n);
                parentPort.postMessage({ status: 'resolved', data: number });
            } catch (error) {
                parentPort.postMessage({ status: 'error', data: null });
            }
        });
};

sendResult();