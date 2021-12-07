const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const {testConnection} = require('../helpers/connection_multi_mongodb')

const UserSchema = new schema ({
    name: {
        type: String, 
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    birthdate: {
        type: Date,
        required: true,
    },
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

UserSchema.pre('save', async function(next) {
    try{
        console.log(`Called before save user:::::::: `, this.email, this.password)
        const salt = await bcrypt.genSalt(10); // Add string to password
        const hashedPassword = await bcrypt.hash(this.password,salt);
        this.password = hashedPassword;
        next();
    }
    catch(error){
        next(error);
    }
})

UserSchema.methods.isCheckPassword = async function(password){
    try {
        return await bcrypt.compare(password, this.password)
    }
    catch(error){

    }
}

module.exports = testConnection.model('user', UserSchema);
