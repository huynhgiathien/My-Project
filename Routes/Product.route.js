const express = require('express');
const createError = require('http-errors');
const route = express.Router();

const ProductController = require('../Controllers/Product.controller')

route.post('/addProduct', ProductController.addProduct)

// route.get('/getlistProduct', ProductController.getlistProduct)


module.exports = route;