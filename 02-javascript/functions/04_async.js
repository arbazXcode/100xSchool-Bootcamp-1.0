
// console.log("Start");

setTimeout(() => {
    // console.log("Inside Timer")
}, 2000);

// console.log("End")

//*Start, end and then Inside timer cuz setTimout registers callback
//*js moves on


//*callback hell

// setTimeout(() => {
//     console.log("Step 1")

//     setTimeout(() => {
//         console.log("Step 2")

//         setTimeout(() => {
//             console.log("Step 3")
//         }, 1000)
//     }, 1000)
// }, 1000)

//? Practice questions.

// Q 1: Create a function doTask(taskName, callback)
// Print Starting taskName
// Call callback
// Print Finished taskName

// function doTask(taskName, callback) {
//     console.log("Starting ", taskName)

//     callback()

//     console.log("Finished ", taskName)
// }

// function coding() {
//     console.log("Do code atleast 8 hours.")
// }
// doTask("Code", coding)


// Q2️⃣ Write a calculator using callbacks
// calculate(10, 5, add)
// calculate(10, 5, subtract)

function calculator(a, b, callback) {
    return result = callback(a, b);
}

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}

console.log(calculator(3, 5, add))
console.log(calculator(8, 4, subtract))



var a = 10
var b = 20

function addNumber(num1, num2) {
    var sum = num1 + num2
    return sum
}

var result1 = addNumber(3, 5);
var result2 = addNumber(9, 7);

console.log(result1, result2)