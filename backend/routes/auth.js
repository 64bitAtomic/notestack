const express = require("express");
const routes = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator'); // validate user input
const bcrypt = require('bcryptjs'); // For hashing the password of the user
var jwt = require('jsonwebtoken'); // for providing jwt authentication 
const JWT_SECRET = 'Rroronova$zoro'; // jwt secret key 

const fetchuser = require('../middleware/fetchUser'); // for fetching user 

// Route : 1 create a user using : POST "/api/auth/createuser" . Doesn't require Auth
routes.post('/createuser',
    [// For input Validation {for more info checkout}
        body('email', 'Please Enter an Valid Email').isEmail(),
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('password', 'Password is too weak').isLength({ min: 5 }),

    ], async (req, res) => {
        // If there are errors , return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // checking if the user already exits in the database
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exits" })
            }
            // adding salt for hashing password
            const salt = await bcrypt.genSalt(10);
            // creating scuredpassword using bcrypt.js hash() method
            const securepasswored = await bcrypt.hash(req.body.password,salt);
            // Creating a user in database
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securepasswored
            });

            // token for already loged in users
            const data = {
                user:{
                    id: user.id
                }
            }
            // jwt.sign function to add extra payload in the token
            const authToken = jwt.sign(data,JWT_SECRET);
            res.json({authToken});
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Internal Server Error");
        }
    });



//Route : 2 Authenticate a user using : POST "/api/auth/login" . no login required

routes.post('/login',[
    body('email','Enter an Vaild Name').isLength({min:3}),
    body('password','Password can not be empty').exists()
], async (req,res)=>{
    let success = false;
    const error = validationResult(req);
    if(!error.isEmpty()){
        res.status(400).json({error: error.array()});
    }

    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Login with Legit Credentials."})
        }

        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success = false;
            return res.status(400).json({success ,error: "Login with Legit Credentials."})
        }

        const payload = {
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(payload,JWT_SECRET);
        success= true;
        res.json({success,authToken});
    } catch (error) {
        console.error(error.message);
        res.send(500).json({error: "Internal Server Error"});

    }
});

//Route : 3 Loged in  user details using : POST "/api/auth/getuser" . login required
routes.post('/getuser', fetchuser,async (req,res)=>{
try {
    userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error")
    
}
})
module.exports = routes;