const express = require('express');
const createError = require('http-errors');
const route = express.Router();

const BrandController = require('../Controllers/Brand.controller')

route.post('/addbrand', BrandController.addbrand)

route.get('/getlistbrand', BrandController.getlistbrand)


module.exports = route;