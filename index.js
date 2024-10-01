const express = require('express');
const app = express();

const SERVER_PORT = process.env.port || 3000;

//http://localhost:3000/
app.get('/', (req, res) => {
    res.send("<h1>Welcome</h1>");
})


// Listen to server
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
})