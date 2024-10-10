const express = require('express');
const model = require("../models/Employee");
const mongoose = require('mongoose');
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
        const id = new mongoose.Types.ObjectId(req.params)
        const emp = await model.findOne({_id: id});

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
        const email = req.body.email;
        if(await model.findOne({email: email})){
            res.status(401).json({
                message: `User with email ${email} already exists.`
            });
            return
        }

        const newEmp = await new model({
            ...req.body,
            created_at: Date.now()
        })

        await newEmp.save().catch(e => {
            console.log(e);
            res.status(500).send(e);
            return
        });
        
        res.status(201).json(await model.findOne(newEmp));
    }catch(e){
        res.status(500).send(e);
    }
});

//http://localhost:3000/api/v1/emp/employees/{eid}
router.put("/employees/:id", async (req, res) => {
    try{
        const id = new mongoose.Types.ObjectId(req.params) 
        await model.findById({_id: id}).catch(e => { // Will not throw error if user DNE 
            console.log(e);
            res.status(401).json({
                message: `User with id ${id} was not found`
            });
            return
        });

        await model.findByIdAndUpdate({_id: id}, {$set : req.body, updated_at: Date.now()});

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
        const id = new mongoose.Types.ObjectId(req.params)

        await model.findByIdAndDelete({_id: id});

        res.status(201).json({
            message: "Employee deleted successfully."
        })
    }catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;