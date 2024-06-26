// Declaring global variables
const display = document.querySelector("#display")
let num1 = ""
let num2 = ""
let expression = ""
let operator = ""
let reset = false

// Function to prevent display from widening
function limitdp(result) {
    result = String(result)
    if (result.length > 14) {
        dec = result.indexOf(".")
        len = result.length
        return parseFloat(result).toFixed(13-dec-1)
    } else {
        return result
    }
}

//Clear functions
function clearInput() {
    num2 = ""
    num1 = ""
    operator = ""
}
function clearDisplay() {
    display.innerHTML = "" 
}

//Flipping signs function
function flip(num) {
    if (num.charAt(0) == "-") {
        end = num.length
        num = num.substring(1, end-1)
        display.innerHTML = limitdp(num)
        return num
    } else {
        num = "-" + num
        display.innerHTML = limitdp(num)
        return num
    }
}

//Delete function 
function backspace(number) {
    number = number.substring(0, number.length - 1)
    display.innerHTML= number
    return number
}

//Number keys or button function
function numberKey(number) {
    number = String(number)
    if (reset) {
        reset = false
        num1 = number
    } else {
        num1 += number   
    }        
}

// Checking for number buttons being clicked
const numbers = document.querySelectorAll(".number")
numbers.forEach((number) => {
    number.addEventListener("click", () => {
        clearDisplay()
        display.innerHTML = ""
        numberKey(number.value)
        display.innerHTML = limitdp(num1)
    })
})

/* Checking for number keys being pressed
document.addEventListener("keydown", function(event) {
    if ([0,1,2,3,4,5,6,7,8,9].includes(parseInt(event.key))) {
        numberKey(event.key)
        display.innerHTML= limitdp(num1)
    }
})

*/

function operatorKey(op) {
    if (op == "-" && !num1 && !eval(expression)){
        clearDisplay()
        num1 = "-" + num1
        display.innerHTML = "-" 
        operator = ""
    } else {
        if (num1 && num2 && operator) {
            expression = num2 + operator + num1
            num2 = String(eval(expression))
            num1 = ""
            display.innerHTML = limitdp(num2)
        }
        else {
            num2 = num1
            num1 = ""
        }
    } 
}
// Checking for operators being clicked
const operators = document.querySelectorAll(".operator")
operators.forEach((op) => {
    op.addEventListener("click", () => {
        operatorKey(op.value)
        operator = op.value
    })
})
/* Using operator keys
document.addEventListener("keydown", function(event) {
    if (event.key in ["+","-", "x","*", "/"]) {
        operator = event.key
        if (event.key == "x") {
            operator = "*"
        }
        operatorKey()
    }

})
*/

//Checking for equal sign being clicked
const equals = document.querySelector("#equal") 
equals.addEventListener("click", () => {
    expression = num2 + operator + num1
    if (eval(expression) || eval(expression) === 0) {
        display.innerHTML = limitdp(eval(expression))
        clearInput()
        num1 = String(eval(expression))
        expression = ""
    } else {
        display.innerHTML = "INVALID"
        clearInput()
    }
})  


//Checking for AC button being clicked
const clear = document.querySelector("#clear") 
clear.addEventListener("click", () => {
    clearInput()
    expression = ""
    display.innerHTML = ""
})

//Checking for plus minus button being clicked
const sign = document.querySelector("#flip") 
sign.addEventListener("click", () => {
    if (display.innerHTML === num1 && num1){
        num1 = flip(num1)
    } else {
        clearInput()
        num1 = "-"
        display.innerHTML = "-0"
    }
    
})

//Checking for % button being clicked
const mod = document.querySelector("#modulus") 
mod.addEventListener("click", () => {
    clearDisplay()
    num1 /= 100
    display.innerHTML = limitdp(num1)
    reset = true
})

//Checking for backspace key being pressed
document.addEventListener("keydown", function(event) {
    if (event.key === "Backspace" || event.key === "Delete") {
        if (display.innerHTML === num1){
            num1 = backspace(num1)
        } else {
            num2 = backspace(num2)
        }
    }
})
