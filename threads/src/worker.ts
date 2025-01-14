import { workerData, parentPort } from "worker_threads";
import crypto from "crypto";

import os from "os";

function displayCPUCores() {
    const cpus = os.cpus();
    const cpuIndex = process.pid % cpus.length; // Use process ID to determine the CPU index
    return cpuIndex + 1; // Return 1-based index for better readability
}

parentPort!.on("message", (value: number) => {
    const cpuUsed = displayCPUCores(); // Get the current CPU used
    console.log(`Worker running on CPU ${cpuUsed} is processing value: ${value}`);

    let counter = 0;
    for (let index = 0; index < value; index++) {
        crypto.createHmac("sha256", "secret").update(new Array(1).fill("a").join(".")).digest("hex");
        counter++;
    }

    parentPort!.postMessage(counter); // Send back the result
});
