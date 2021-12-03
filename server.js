const express = require('express');
const app = express();
const UserRoute = require('./Routes/User.route')
const createError = require('http-errors');
const { urlencoded } = require('express');
require('dotenv').config();

const client = require('./helpers/connection_redis')

client.set('Examaple', 'anyostich');
client.get('Examaple', (err, result) => {
    console.log(result)
    if(err) throw createError.BadRequest();
    console.log(result)
})

app.get('/', function (req, res, next) {
    res.send('Home page')
})

app.use(express.json());
app.use(urlencoded({extended: true}));
app.use('/user', UserRoute);

app.use((req, res, next) => {
    // const error = new Error('Not Found');
    // error.status = 500;
    // next(error);
    next(createError.NotFound("This route does not exist!!!"));
})

app.use((error, req, res, next) => {
    res.json({
        status: error.status || 500,
        message: error.message
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})