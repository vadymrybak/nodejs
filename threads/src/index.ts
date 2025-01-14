import express from "express";
import { Worker } from "worker_threads";
import path from "path";
import os from "os";

const app = express();
const port = process.env.PORT || 3000;
const cpuCount = os.cpus().length;

console.debug(`CPUs: ${cpuCount}`);

function createWorker(id): Promise<number> {
    return new Promise((resolve, reject) => {        
        const worker = new Worker(path.resolve(__dirname, "worker.ts"), {
            workerData: { 
                id
            },
        });

        worker.postMessage(3_000_000); // Send value to worker

        worker.on("message", (data) => {
            resolve(data);
        });

        worker.on("error", (error) => {
            reject(error);
        });
    });
}

app.get("/nb", (req, res) => {
    console.debug("nb");
    res.status(200).send("NB OK");
});

app.get("/b", async (req, res) => {
    const workerAmount = req.query.workers || 1;
    console.debug(`blocking operation started - Creating ${workerAmount} worker(s)`);
    const before = Date.now();

    const workerPromises: Promise<number>[] = [];
    for (let index = 0; index < parseInt(workerAmount as string); index++) {
        workerPromises.push(createWorker(`w-${index}`));
    }

    const results = await Promise.all(workerPromises);
    const after = Date.now();

    const total = results.reduce((a, b) => a + b, 0);
    res.status(200).send(`res: ${total}. Time took: ${(after - before) / 1000}`);
});

app.listen(port, () => {
    console.log("server lister on port " + port);
});


// How many crypto to create
// How many workers to use
// Return result to SharedBufferArray