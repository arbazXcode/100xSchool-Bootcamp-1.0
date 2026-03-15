//*Math is in-built object.
//*It is not a constructor -> cannot be called like new Math()

//*Difference between Math.floor(), ceil(), round(), truc()

//* 🔹 floor → down
//* 🔹 ceil → up
//* 🔹 round → nearest
//* 🔹 trunc → removes decimal

// console.log(Math.floor(4.9));
// console.log(Math.floor(4.3));
// console.log(Math.floor(4));

// console.log(Math.ceil(4.1));
// console.log(Math.ceil(4.9));
// console.log(Math.ceil(4));

// console.log(Math.round(4.5));
// console.log(Math.round(4.1));
// console.log(Math.round(4.8));

// console.log(Math.trunc(4.9));
// console.log(Math.trunc(4.2));
// console.log(Math.trunc(4));

//* Generate a no. -> formula
//* Math.floor(Math.random() * (max - min + 1)) + min

//* Q. Generate random integer between 50 and 100
// const randomNo = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
// console.log(randomNo)

// console.log(Math.max()) // -Infinity
// console.log(Math.min()) // Infinity

//find max value in the array
const arr = [1, 3, 5, 12, 32, 8];
// console.log(Math.max(...arr))
// console.log(Math.max(arr))

console.log(Math.abs(null)) // 0
console.log(Math.abs("5")); // 5
console.log(Math.abs("a")) // NaN

//* Number() -> Converts the entire value into a number.

// Rules:
//* If the whole string is a valid number → works
//* If any invalid character exists → returns NaN

//

