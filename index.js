// C++ to Web Assembly Converter : https://mbebenita.github.io/WasmExplorer/
function LoadAssembly(asmFile) {
    return fetch(asmFile)
        .then(response => response.arrayBuffer())
        .then(bytestream => WebAssembly.compile(bytestream))
        .then(module => new WebAssembly.Instance(module))
        .then(instance => instance.exports._Z12countBillionv)
}

function jsMillionCount() {
    for (var i = 0; i < 1000000000; i++);
    return i;
}


console.time("js-counter");
jsMillionCount();
console.timeEnd("js-counter");

console.time("wasm-counter");
LoadAssembly('billion-counter.wasm')
    .then(counter => {
        counter();
    });
console.timeEnd("wasm-counter");
