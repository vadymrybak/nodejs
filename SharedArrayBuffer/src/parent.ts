import { Worker } from "worker_threads";
import path from "path";

const { heapTotal } = process.memoryUsage();
console.log("heapTotal", `${heapTotal / 1000000}MB`);

const workersAmount = 4;
const amountOfCrypto = 25;
const before = Date.now();
const sharedBuffer = new SharedArrayBuffer(65 * amountOfCrypto * workersAmount);
const uint8Array = new Uint8Array(sharedBuffer);

const workerPromises: Promise<number>[] = [];
for (let index = 0; index < workersAmount; index++) {
    workerPromises.push(createWorker(`worker-${index}`, amountOfCrypto));
}

(async () => {
    const results = await Promise.all(workerPromises);
    console.log("Workers finished working");
    console.log(results.flat());
    const after = Date.now();
    console.log("byteLength", uint8Array.byteLength);

    const decoder = new TextDecoder(); // To convert Uint8Array back to string
    let stringEnded = false;
    const resultArray: number[] = [];
    for (let i = 0; i < uint8Array.length; i++) {
        const byte = Atomics.load(uint8Array, i);
        if (byte === 0) {
            // Check for the null terminator
            stringEnded = true;
            break;
        }
        resultArray.push(byte);
    }

    const resultString = decoder.decode(new Uint8Array(resultArray)).slice(0, -1).split(",");
    console.log("from SharedArrayBuffer:", resultString.length);

    console.log(`Time took: ${(after - before) / 1000}`);
})();

function createWorker(id: string, amountOfCrypto: number): Promise<number> {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.resolve(__dirname, "worker.ts"), {
            workerData: {
                id,
                amountOfCrypto,
                sharedBuffer,
            },
        });

        worker.on("message", (data) => {
            resolve(data);
        });
        worker.on("error", (error) => {
            reject(error);
        });
    });
}
