const mongoose = require('mongoose');
const schema = mongoose.Schema;

const {testConnection} = require('../helpers/connection_multi_mongodb')

const OrderSchema = new schema ({
    id:{
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    create_date: {
        type: Date,
        required:true,
    },
    update_date: {
        type: Date,
        require: false,
    },
    status: {
        type: String,
        required:true,
    },
    id_user: {
        type: String,
        required:true
    }
})

module.exports = testConnection.model('order', OrderSchema);
