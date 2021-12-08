const mongoose = require('mongoose');
const schema = mongoose.Schema;

const {testConnection} = require('../helpers/connection_multi_mongodb')

const OrderDetailSchema = new schema ({
    order_id:{
        type: String,
        required: true
    },
    product_id:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    }
})

module.exports = testConnection.model('orderdetail', OrderDetailSchema);
