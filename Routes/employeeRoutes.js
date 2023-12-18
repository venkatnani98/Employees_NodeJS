const express = require('express')
const router = express.Router()

const employeeController = require('../controllers/employeeController')
const Emp = require('../models/Employee')

//Lets use methods - GET, POST, PUT, DELETE

router.post('/add', employeeController.createEmployee)
router.get('/get', employeeController.getEmployees)
router.get('/get/:id', employeeController.singleEmployee)
// router.put('/update/:id', employeeController.updateEmployee)
router.get('/update/:id', employeeController.updateEmployee)
router.post('/update/:id', employeeController.updateEmployee)
router.delete('/delete/:id', employeeController.deleteEmployee)


module.exports = router