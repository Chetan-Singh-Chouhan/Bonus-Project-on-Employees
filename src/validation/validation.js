
const validateEmail = function (input) {
    if (input.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) return true
}

const validatePassword = function (input) {
    if (input.match(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/)) return true
}



module.exports = { validateEmail, validatePassword }