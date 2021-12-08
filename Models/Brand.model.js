const mongoose = require('mongoose');
const schema = mongoose.Schema;

const {testConnection} = require('../helpers/connection_multi_mongodb')

const BrandSchema = new schema ({
    id:{
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
})

module.exports = testConnection.model('Brand', BrandSchema);
