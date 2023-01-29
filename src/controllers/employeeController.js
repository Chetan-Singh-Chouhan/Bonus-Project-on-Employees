const employeeModel = require("../models/employeeModel")
const courseModel = require("../models/courseModel")
const validation = require("../validation/validation")
const jwt = require('jsonwebtoken')

const createEmployee = async (req, res) => {
    try {

        let { name, email, password, role } = req.body
       
        if (!name || name.trim() == "") return res.status(400).send({ status: false, message: "Name Field Can't be empty" })
        if (typeof (name) != "string") return res.status(400).send({ status: false, message: "Name must be in String Format" })

        if (!email || email.trim() == "") return res.status(400).send({ status: false, message: "Email Field Can't be empty" })
        if (typeof (email) !== "string") return res.status(400).send({ status: false, message: "Name must be in String Format" })
        if (!validation.validateEmail(email)) return res.status(400).send({ status: false, message: "invalid email address" })

        if (!password) return res.status(400).send({ status: false, message: "password is mandatory" })
        if (typeof (password) !== "string") return res.status(400).send({ status: false, message: "wrong format of password" })
        if (!validation.validatePassword(password)) return res.status(400).send({ status: false, message: "length of password should be 8 to 15 characters" })

        if (!role || role.trim() == "") return res.status(400).send({ status: false, message: "Role field Can't be emptied" })
        if (typeof (role) !== "string") return res.status(400).send({ status: false, message: "wrong format of role" })
        if (!(["Super Admin", "Admin", "Employee"].includes(role.trim()))) return res.status(400).send({ status: false, message: "title can only contain Mr,Mrs, Miss" })
        
        const createdEmployee = await employeeModel.create(req.body)
        return res.status(201).send({ 
            status: true,
            message: "Success", 
            data: createdEmployee 
        })
    } 
    catch (err) {
        res.status(500).send({ 
            status: false, 
            message: err.message 
        })
    }
}

const login = async function (req, res) {
   try{
        let { email, password } = req.body
        //validation of email
        if (!email || email.trim() == "") return res.status(400).send({ status: false, message: "email is mandatory" })
        if (typeof (email) !== "string") return res.status(400).send({ status: false, message: "wrong format of email" })
        if (!validation.validateEmail(email)) return res.status(400).send({ status: false, message: "invalid email address" })
        //validation of password
        if (!password || password.trim() == "") return res.status(400).send({ status: false, message: "password is mandatory" })
        if (typeof (password) !== "string") return res.status(400).send({ status: false, message: "wrong format of password" })
        if (!validation.validatePassword(password)) return res.status(400).send({ status: false, message: "length of password should be 8 to 15 characters" })

        let isEmployeeExist = await employeeModel.findOne({ email: email, password: password })
        if (!isEmployeeExist)
            return res.status(401).send({ 
                status: false,
                message: "Email Id and password are incorrect" 
            })
        const empToken = jwt.sign({ empId: isEmployeeExist._id, empRole: isEmployeeExist.role }, 'secretKey', { expiresIn: 1800 })
        return res.status(200).send({
            status: true,
            message: 'Success',
            data: empToken
        })
   }
   catch (err) {
        res.status(500).send({ 
            status: false, 
            message: err.message 
        })
    }

};



module.exports = { createEmployee, login }