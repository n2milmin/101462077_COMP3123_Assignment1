const express = require('express');
const router = express.Router();

//http://localhost:3000/
router.get('/', (req, res) => {
    res.send("<h1>Welcome from Users</h1>");
});

router.get('/about', (req, res) => {
    res.send("About Page");
});

module.exports = router;