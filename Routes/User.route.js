const express = require('express');
const createError = require('http-errors');
const route = express.Router();

const User = require('../Models/User.model');

route.post('/register', async (req, res, next) => {
    try{
        const {email, password} = req.body;
        if (!email || !password)
        {
            throw createError.BadRequest();
        }

        const isExists = await User.findOne({email: email})
        if(isExists)
        {
            throw createError.Conflict(`${email} is ready been registered`);
        }
        console.log(await User.findOne({}))
        const isCreate = await User.create({
            email: email,
            password: password
        });
        
        return res.json({ 
            status: '200 OK',
            element: isCreate
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

route.post('/login', (req, res, next) => {
    res.send('function login')
})

route.post('/logout', (req, res, next) => {
    res.send('function logout')
})

module.exports = route;