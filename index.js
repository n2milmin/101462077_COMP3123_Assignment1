const express = require('express');
const app = express();
const userRouter = require('./users');
const empRouter = require('./employees');

const SERVER_PORT = process.env.port || 3000;

app.use(express.json());
app.use('/user', userRouter)
app.use('/emp', empRouter)

//http://localhost:3000/
app.get('/', (req, res) => {
    res.send("<h1>Welcome</h1>");
});
app.get('/about', (req, res) => {
    res.send("About Page");
});

// Listen to server
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
})