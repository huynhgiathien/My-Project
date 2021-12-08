const mongoose = require('mongoose');
const schema = mongoose.Schema;

const {testConnection} = require('../helpers/connection_multi_mongodb')

const ProductSchema = new schema ({
    id:{
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    descriptions: {
        type: String,
        required: false
    },
    option: {
        type: String,
        required: false
    },
    brand_id: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: false
    },
    unitsinstock: {
        type: Number,
        required: false
    },
    sold: {
        type: Number,
        required: false
    }
})

module.exports = testConnection.model('product', ProductSchema);
