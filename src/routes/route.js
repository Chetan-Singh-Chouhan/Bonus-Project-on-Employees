const express = require("express");
const router = express.Router();

const { createEmployee, login, createCourse, updateCourse, deleteCourse } = require("../controllers/employeeController")
const { authentication, authorisation } = require("../middlewares/auth")


router.post("/createEmployee", createEmployee)
router.post("/login", login)
router.post("/createCourse", authentication, createCourse)
router.put("/updateCourse", authentication, updateCourse)
router.delete("/deleteCourse", authentication, deleteCourse)

router.all('/*', function (req, res) {
    res.status(400).send({
        status: false,
        message: "Invalid URL"
    })
})

module.exports = router;
