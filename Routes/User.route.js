const express = require('express');
const createError = require('http-errors');
const route = express.Router();

const User = require('../Models/User.model');
const {userValidate} = require('../helpers/validation')

route.post('/register', async (req, res, next) => {
    try{
        const {email, password} = req.body;

        // Check VALIDATION
        const {error} = userValidate(req.body);
        console.log(`error validation::: `, error)
        if(error) {
            throw createError(error.details[0].message);
        }

        // if (!email || !password)
        // {
        //     throw createError.BadRequest();
        // }

        const isExists = await User.findOne({email: email})
        if(isExists)
        {
            throw createError.Conflict(`${email} is ready been registered`);
        }
        console.log(await User.findOne({}))
        const user = new User({
            email: email,
            password: password
        });

        const savedUser = await user.save();
        
        return res.json({ 
            status: '200',
            element: savedUser
        })
    }
    catch(error)
    {
        next(error);
    }


})

route.post('/refresh-token', (req, res, next) => {
    res.send('function refresh-token')
})

route.post('/login', async (req, res, next) => {
    try {
        const {email, password} = req.body
        const {error} = userValidate(req.body)
        if (error) {
            throw createError(error.details[0].message)
        }
    
        const user = await User.findOne({email});
        if (!user) {
            throw createError.NotFound(`User not found`)
        }
    
        const isValid = await user.isCheckPassword(password);
        if (!isValid) {
            throw createError.Unauthorized();
        }
    
        res.send(user)
    }
    catch(error) {
        next(error)
    }
})

route.post('/logout', (req, res, next) => {
    res.send('function logout')
})

module.exports = route;