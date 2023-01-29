const express = require("express");
const router = express.Router();

const { createEmployee, login } = require("../controllers/employeeController")
const { authentication, authorisation } = require("../middlewares/auth")


router.post("/createEmployee", createEmployee)
router.post("/login", login)


router.all('/*', function (req, res) {
    res.status(400).send({ 
        status: false,
        message: "Invalid URL" 
    })
})



module.exports = router;
