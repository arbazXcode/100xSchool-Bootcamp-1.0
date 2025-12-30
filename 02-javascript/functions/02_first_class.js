

//* meaning -
//* functions can be stored in variables
//* Passed as arguments
//* Returned from functions

function greet(fn) {
    fn()
}

function sayHello() {
    console.log("Hello")
}

// greet(sayHello)