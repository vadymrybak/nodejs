import express from "express";

const app = express();
const port = process.env.PORT || 3000;

const map = new Map();
const wMap = new WeakMap();
let arr: string[] = [];

app.get("/p", (req, res) => {
    for (let index = 0; index < 1_000_000; index++) {
        map.set({ index }, `iterationVadim-${index}`);
    }
    res.send("done")
});

app.get("/w", (req, res) => {
    for (let index = 0; index < 1_000_000; index++) {
        wMap.set({ index }, `iterationVadim-${index}`);
    }
    res.send("done")
});

app.get("/p2", (req, res) => {
    for (let index = 0; index < 1_000_000; index++) {
        arr.push(`iterationVadim-${index}`);
    }
    res.send("done")
});

app.get("/p3", (req, res) => {
    arr = [];
    res.send("cleared")
});


app.get("/", (req, res) => {
    const memoryUsage = process.memoryUsage();
    res.json({
        rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
        external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`,
        map: map.size
    });
});

app.listen(port, () => {
    console.log("server lister on port " + port);
    console.log(process.pid);
});
