//* callback - a function passed to another function to execute later.

function square(n) {
    return n * n;
}

function sumOfSquares(a, b) {
    const val1 = square(a);
    const val2 = square(b);

    return val1 + val2;
}

const result = sumOfSquares(3, 5);
// console.log(result)


const processData = function (callback) {
    console.log("Processing data...")
    callback()
}

function done() {
    console.log("done.")
}

// console.log(processData(done))

//callback with data

function calculate(a, b, operation) {
    return operation(a, b);
}

function operation(a, b) {
    return a * b;
}

const ans = calculate(2, 3, operation);
console.log(ans)