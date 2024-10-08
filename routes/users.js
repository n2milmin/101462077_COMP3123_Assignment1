const express = require('express');
const model = require('../models/User');
const router = express.Router();

//http://localhost:3000/user/
router.get('/', (req, res) => {
    res.send("<h1>Welcome from Users</h1>");
});

//http://localhost:3000/user/signup
router.post('/signup', async (req, res) => {
    try{
        const { username, email, password } = req.body;
        
        if(await model.findOne({username: username})){
            res.status(401).json({
                message: "Username already exists"
            })
            return;
        };

        let user = await new model({
            username: username,
            email: email,
            password: password,
            created_at: Date.now()
        });
        
        user.save();
        user = await model.findOne({username: username});

        res.status(201).json({
            message: "User created successfully",
            user_id: user.id
        });
    } catch(e){
        res.status(500).send(e);
    }
});


//http://localhost:3000/user/
router.post("/login", async (req, res) => {
    const givenUser = req.body;
    try{
        const foundUser = await model.findOne({
            $or: [{username: givenUser.username}, {email: givenUser.email}]
        });

        if(foundUser){
            if(password != foundUser.password){
                res.status(401).json({
                    status: false,
                    message: "Invalid username/password."
                })
            }
            else{
                res.status(200).json({
                    status: true,
                    message: "Login successful"
                })
            }
        }
    } catch(e) {
        res.status(500).send(e)
    }
});


module.exports = router;