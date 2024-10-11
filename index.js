const express = require('express');
const app = express();
const mongoose = require('mongoose');
const apiv1 = express();
const userRouter = require('./routes/users');
const empRouter = require('./routes/employees')

app.use(express.json());
app.use(express.urlencoded({ extended: true})); 

apiv1.use('/user', userRouter);
apiv1.use('/emp', empRouter);
app.use('/api/v1', apiv1)

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:admin@localhost:27017/comp3123?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB");
}).catch(err => {
    console.log(err);
});

const loggerMiddleware = (req, res, next) => {
    console.log(`Logged ${req.url} ${req.method} -- ${new Date()}`);
    next();
}
// Apply middleware to all requests 
app.use('/user', loggerMiddleware)

// Error endpoint 
app.get('/error', (req, res) => {
    throw new Error('This is a forced error');
});

//http://localhost:3000/
app.route('/').get((req, res) => {
    res.send("<h1>Welcome</h1>");
});

// Listen to server
app.listen(SERVER_PORT, () => {
    console.log('Server is running on http://localhost:3000');
})