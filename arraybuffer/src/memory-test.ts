const z = "asd32321321321321321323fsdfdsfdsfdsfdsfdsfds";
const l = {
    a: 1.23,
    b: Array.from({ length: 100 }).map((el, index) => {
        let z = "";
        for (let i = 0; i < index; i++) {
            z += "a";
        }
        return z;
    }),
};
const memoryUsage = process.memoryUsage();
console.log(`RSS: ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`);
console.log(`Heap Total: ${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
console.log(`Heap Used: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
console.log(`External: ${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`);
