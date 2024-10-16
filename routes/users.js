const express = require('express');
const model = require('../models/User');
const { validationResult } = require('express-validator');
const { compare } = require('bcrypt');
const router = express.Router();

// Landing page
//http://localhost:3000/user/
router.get('/', (req, res) => {
    res.send("<h1>Welcome from Users</h1>");
});

// Sign up user
/*
{
  "username": "johndoe",
  "email": "johndoe@domain.com",
  "password": "password123"
} 
*/
//http://localhost:3000/user/signup
router.post('/signup', async (req, res) => {
    // Validate req.body
    if(!validationResult(req.body).isEmpty()){
        res.status(401).json({
            message: "Missing required information"
        });
        return
    }

    // Preform task
    try{
        const { username, email, password } = req.body;
        
        // Check if user exists
        if(await model.findOne({username: username})){
            res.status(401).json({
                message: "Username already exists"
            })
            return;
        };

        // Hash password
        

        // Create user
        let user = await new model({
            username: username,
            email: email,
            password: password,
            created_at: Date.now()
        });
        
        // Save & fetch new user
        await user.save();
        user = await model.findOne({username: username});

        res.status(201).json({
            message: "User created successfully",
            user_id: user.id
        });
    } catch(e){
        res.status(500).send(e);
    }
});

// Login
/*
{
  "email": "johndoe@domain.com",
  "password": "password123"
}
*/
//http://localhost:3000/user/login
router.post("/login", async (req, res) => {
    // Validate req.body
    if(!validationResult(req.body).isEmpty()){
        res.status(401).json({
            message: "Missing required information"
        })
        return;
    }

    // Preform task
    try{
        const givenUser = req.body;
        // find user by username or email
        const foundUser = await model.findOne({
            $or: [{username: givenUser.username}, {email: givenUser.email}]
        });

        // Validate password
        if(foundUser){
            if(!compare(givenUser.password, foundUser.password)){
                res.status(401).json({
                    status: false,
                    message: "Invalid username/password."
                });
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