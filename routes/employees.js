const express = require('express');
const model = require("../models/Employee");
const router = express.Router();

//http://localhost:3000/api/v1/emp/
router.get('/', (req, res) => {
    res.send("<h1>Welcome from Employees</h1>");
});

//http://localhost:3000/api/v1/emp/employees
router.get("/employees", async (req, res) => {
    try{
        const employees = await model.find({});
        res.status(201).json({employees});
    }catch(e){
        res.status(500).send(e)
    }
});

//http://localhost:3000/api/v1/emp/employees/id
router.get("/employees/:id", async (req, res) => {
    try{
        const emp = await model.findOne({id: req.query});
        if(emp)
            res.status(201).json({emp});
        else
            res.status(401).json({message: "User not found"});
    }catch(e){
        res.status(500).send(e);
    }
});

//http://localhost:3000/api/v1/emp/employees
router.post("/employees", async (req, res) => {
    try{
        const {first_name, last_name, email, positon, 
            salary, date_of_joining, department} = req.body;
        
        let newEmp = await new model({
            first_name: first_name,
            last_name: last_name,
            email: email,
            positon: positon,
            salary: salary,
            date_of_joining: date_of_joining,
            department: department,
            created_at: Date.now()
        })

        newEmp.save();
        newEmp = await model.findOne({email: email});

        res.status(201).json(newEmp);
    }catch(e){
        res.status(500).send(e);
    }
});

//http://localhost:3000/api/v1/emp/employees/{eid}
router.put("/employees/:id", async (req, res) => {
    try{
        const {positon, salary} = req.body;
        const id = req.params;

        await model.findOneAndUpdate({_id: id}, 
            {positon: positon}, {salary: salary});
        
        res.status(201).json({
            message: "Employee details updated successfully."
        });
    }catch(e){
        res.status(500).send(e);
    }
});

//http://localhost:3000/api/v1/emp/employees/{eid}
router.delete("/employees/:id", async (req, res) => {
    try{
        const id = req.params;

        await model.findByIdAndDelete({_id: id});

        res.status(201).json({
            message: "Employee deleted successfully."
        })
    }catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;