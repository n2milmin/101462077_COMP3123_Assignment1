const express = require('express');
const app = express();
const apivi = express();
const userRouter = require('/routes/user');
const empRouter = require('/routes/employees')

app.use(express.json());
app.use(express.urlencoded({ extended: true})); 

apivi.use('/user', userRouter);
apivi.use('/emp', empRouter);
app.use('/api/v1', apiv1)

const SERVER_PORT = 3000;

mongoose.connect('mongo://localhost:27017/db/comp3123', {
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
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
})