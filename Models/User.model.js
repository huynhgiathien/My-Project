const mongoose = require('mongoose');
const schema = mongoose.Schema;

const {testConnection} = require('../helpers/connection_multi_mongodb')

const UserSchema = new schema ({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = testConnection.model('user', UserSchema);
