const express = require('express');
const app = express();
const userRouter = require('./users');
const empRouter = require('./employees');
const errorHanldingMiddleware = require('./errorHandlingMiddleware');

const SERVER_PORT = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true})); 

app.use('/user', userRouter)
app.use('/emp', empRouter)

const loggerMiddleware = (req, res, next) => {
    console.log(`Logged ${req.url} ${req.method} -- ${new Date()}`);
    next();
}
// Apply middleware to all requests 
app.use('/user', loggerMiddleware)
// Error handling Middleware
app.use(errorHanldingMiddleware)

// Error endpoint 
app.get('/error', (req, res) => {
    throw new Error('This is a forced error');
    res.send('Welcome to Express error handling');
});

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