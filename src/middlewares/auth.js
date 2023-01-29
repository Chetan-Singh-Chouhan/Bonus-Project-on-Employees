const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const employeeModel = require("../models/employeeModel")

const authentication = function (req, res, next) {
    try {
        const token = req.headers.token
        if (!token)
            return res.status(401).send({
                status: false,
                message: "Token Headers is missing"
            })
        jwt.verify(token, 'secretKey', (err) => {
            if (err)
                return res.status(403).send({
                    status: false,
                    message: "Please login"
            })
            
        })
        next()
    }
    catch {
        return res.status(500).send({
            status: false,
            message: "Server Side Error"
        })
    }
}


const authorisation = async function (req, res, next) {
    try {
        const token = req.headers.token
        const userIdInToken = jwt.decode(token).userId

        const booksId = req.params.bookId

        if (!mongoose.isValidObjectId(booksId)) {
            return res.status(400).send({
                status: false,
                message: "Please enter Valid Object Id"
            })
        }
       
        if (token.role!=) {
            return res.status(404).send({
                status: false,
                message: "Book Id Doesn't exist"
            })
        }

        if (token.role != Admin)
            return res.status(403).send({
                status: false,
                message: "You are not Authorized"
            })

        next()
    }
    catch(err){
        return res.status(500).send({
            status: false,
            message: err.message
   })
}

}

module.exports = { authentication, authorisation}