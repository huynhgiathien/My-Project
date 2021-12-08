const express = require('express');
const app = express();
const UserRoute = require('./Routes/User.route')
const BrandRoute = require('./Routes/Brand.route')
const ProductRoute = require('./Routes/Product.route')
const OrderRoute = require('./Routes/Order.route')
const createError = require('http-errors');
const { urlencoded } = require('express');
require('dotenv').config();

const logEvents = require('./helpers/logEvents');

//const helmet = require('helmet')
const morgan = require('morgan')

const client = require('./helpers/connection_redis')

//app.use(helmet());
app.use(morgan('common'));

app.get('/', function (req, res, next) {
    res.send('Home page')
})

app.use(express.json());
app.use(urlencoded({extended: true}));

//List route
app.use('/user', UserRoute);
app.use('/brand', BrandRoute);
app.use('/product', ProductRoute);
app.use('/order', OrderRoute);

app.use((req, res, next) => {
    // const error = new Error('Not Found');
    // error.status = 500;
    // next(error);
    next(createError.NotFound("This route does not exist!!!"));
})

app.use((error, req, res, next) => {
    logEvents(`${req.url} ---  ${req.method} --- ${error.message}`)
    res.json({
        status: error.status || 500,
        message: error.message
    })
})

const PORT = process.env.PORT || 3000;


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})