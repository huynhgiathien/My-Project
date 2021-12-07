const express = require('express');
const createError = require('http-errors');
const route = express.Router();


const {verifyAccessToken} = require('../helpers/jwt_service');
const UserController = require('../Controllers/User.controller')

route.post('/register', UserController.register )

route.post('/refresh-token', UserController.refreshToken)

route.post('/login', UserController.login)

route.delete('/logout', UserController.logout)

route.get('/getlist', verifyAccessToken, UserController.getlist)

route.get('/getinfo', verifyAccessToken, UserController.getinfo)

module.exports = route;