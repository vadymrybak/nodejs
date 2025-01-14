// Создаем буффер (область в памяти) длинной в 16 байтов
const buffer1: ArrayBuffer = new ArrayBuffer(16);
const buffer2: ArrayBuffer = new ArrayBuffer(16);
const buffer3: ArrayBuffer = new ArrayBuffer(16);
const buffer4: ArrayBuffer = new ArrayBuffer(16);

// Теперь используем эти 16 байтов.
// Этому объекту нужен только 1 байт для каждого элемента.
// Доступные величины 0-255
// Таким образом получаем массив из 16ти элементов
const view8: Uint8Array = new Uint8Array(buffer1);
view8[0] = 255;

// Этому объекту нужно 2 байта для каждого элемента
// 0 до 65535
// Таким образом получаем массив из 8и элементов
const view16: Uint16Array = new Uint16Array(buffer2);
view16[0] = 65535;

// Этому объекту нужно 4 байта для каждого элемента
// 0 до 4294967295
// Таким образом получаем массив из 4x элементов
const view32: Uint32Array = new Uint32Array(buffer3);
view32[0] = 4294967295;

// Этому объекту нужно 8 байта для каждого элемента
// 5.0x10-324 и 1.8x10308
// Таким образом получаем массив из 2x элементов'
const view64: Float64Array = new Float64Array(buffer4);
view64[0] = 4294967295.321;

console.log(view8.map((el) => el + 1));
console.log(view16);
console.log(view32, "BYTES_PER_ELEMENT: ", Uint32Array.BYTES_PER_ELEMENT, "BYTE LENGTH: ", view32.byteLength);
console.log(view64);

const memoryUsage = process.memoryUsage();
console.log(`RSS: ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`);
console.log(`Heap Total: ${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
console.log(`Heap Used: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
console.log(`External: ${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`);
