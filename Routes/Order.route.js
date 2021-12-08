const express = require('express');
const createError = require('http-errors');
const route = express.Router();

const OrderController = require('../Controllers/Order.controller')

route.post('/addOrder', OrderController.addOrder)

// route.get('/getlistProduct', ProductController.getlistProduct)


module.exports = route;