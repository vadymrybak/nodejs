import { parentPort, workerData } from "worker_threads";
import crypto from "crypto";

function Str_Random(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < length; i++) {
        const randomInd = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomInd);
    }    
    return result;
}

// Function to modify the shared memory
const modifySharedArray = (amountOfCrypto: number) => {
    const workerId = workerData.id;
    const uint8Array = new Uint8Array(workerData.sharedBuffer);
    const encoder = new TextEncoder(); // to convert string to Uint8

    for (let index = 0; index < workerData.amountOfCrypto; index++) {
        const value = crypto.createHmac("sha256", "secret").update(new Array(30_000_000).fill(Str_Random(1)).join(".")).digest("hex");
        const encodedString = encoder.encode(value + ","); // Encode the string

        for (let i = 0; i < encodedString.length; i++) {
            Atomics.store(uint8Array, uint8Array.indexOf(0), encodedString[i]); // Store each byte in SharedArray
        }
    }

    parentPort!.postMessage(`${workerId} done`);
};

modifySharedArray(workerData.amountOfCrypto);
