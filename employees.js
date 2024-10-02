const express = require('express');
const router = express.Router();

//http://localhost:3000/
router.get('/', (req, res) => {
    res.send("<h1>Welcome from Employees</h1>");
});

router.get("/employees", (req, res) => {
    res.send("Get all Employees");
});
router.get("/employees/:id", (req, res) => {
    res.send(`Get Employee by ID: ${req.params.id}`);
});

router.post("/employees", (req, res) => {
    const employees = req.body;
    res.send(employees);
});

router.put("/employees/:id", (req, res) => {
    res.send(`Update Employee by ID: ${req.params.id}`);
});

router.delete("/employees/:id", (req, res) => {
    res.send(`Delete Employee by ID: ${req.params.id}`);
});

module.exports = router;