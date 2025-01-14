import crypto from "crypto";

const arr = new Array(200).fill("something");

function doHeavyStuff(item) {
    // console.log("doHeavyStuff");
    crypto.createHmac("sha256", "secret").update(new Array(10000).fill(item).join(".")).digest("hex");
}

function processChunk() {
    if (arr.length === 0) {
        // код, выполняющийся после обработки всего массива
        console.log("I'm done");
    } else {
        
        // выберем 10 элементов и удалим их из массива
        const subarr = arr.splice(0, 10);
        for (const item of subarr) {
            console.log("processing chunk", arr.length);
            // произведём сложную обработку каждого из элементов
            doHeavyStuff(item);
        }
        // поставим функцию в очередь
        setImmediate(processChunk);
    }
}

processChunk();

// Этот фрагмент нужен лишь для подтверждения того, что, обрабатывая большой массив,
// мы даём возможность выполняться и другому коду.

let interval = setInterval(() => {
    console.log("tick!");
    if (arr.length === 0) clearInterval(interval);
}, 0);
