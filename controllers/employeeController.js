const Employee = require('../models/Employee')

const createEmployee = async(request, response)=>{
    console.log(request.body)
  try{
    const {name, email, phone, city} = request.body

    const employee = new Employee({
        name,
        email,
        phone,
        city
    })
    await employee.save()
    // response.status(201).json(employee)
    response.redirect('/employees/get');
  } catch (error){
    console.log("There is an error", error)
    response.status(500).json({message:'Server Error'})
  }
}


const getEmployees = async(request, response)=>{
    try{
        const employees = await Employee.find()
        // response.status(200).json(employees )
        response.render('list', { employees });
    } catch {
        console.error("There is an error")
        response.status(500).json({message:'Server Error'})
    }
}

const singleEmployee = async(req, res)=>{
    try{
        const employee = await Employee.findById(req.params.id)
        if(!employee){
            return res.status(404).json({message:"Employee not Found"})
        }
        res.status(200).json(employee)
    } catch(error) {
        console.error(error)
        res.status(500).json({message:"Server Error"})
    }
}

// const updateEmployee = async(req, res)=>{
//     try{
//         const {name, email, phone, city} = req.body

//         const myEmp = await Employee.findByIdAndUpdate(
//             req.params.id, {name, email, phone, city} 
//         )
//         if(!myEmp){
//             return res.status(404).json({message : "Employee not Found"})
//         }
//         res.status(200).json(myEmp)

//     } catch(error) {
//         console.error(error)
//         res.status(500).json({message:"Server Error"})
//     }
// }
const updateEmployee = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const employee = await Employee.findById(req.params.id);
            if (!employee) {
                return res.status(404).json({ message: "Employee not Found" });
            }
            res.render('editEmployee', { employee });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    } else if (req.method === 'POST') {
        try {
            const { name, email, phone, city } = req.body;

            const updatedEmployee = await Employee.findByIdAndUpdate(
                req.params.id, { name, email, phone, city }
            );
            console.log(updatedEmployee);

            res.redirect('/employees/get');
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    }
};



const deleteEmployee = async(req, res)=>{
    console.log(req.params.id)
    try{
        
        const deleteEmployee = await Employee.findByIdAndDelete(req.params.id)
        
        res.status(204).send()
    } catch(error) {
        console.error(error)
        res.status(500).json({message:"Server Error"})
    }
}


module.exports = { createEmployee, getEmployees, singleEmployee, updateEmployee, deleteEmployee }