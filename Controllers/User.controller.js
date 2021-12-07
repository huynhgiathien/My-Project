const User = require('../Models/User.model');
const {userValidate} = require('../helpers/validation')
const {signAccessToken,  signRefreshToken, verifyRefreshToken} = require('../helpers/jwt_service');
const client = require('../helpers/connection_redis')
const createError = require('http-errors');

module.exports = {
    register: async (req, res, next) => {
        try{
            const {name, address, birthdate, email, password} = req.body;
            console.log(name)
            // Check VALIDATION
            const {error} = userValidate(req.body);
            console.log(`error validation::: `, error)
            if(error) {
                throw createError(error.details[0].message);
            }
    
            const isExists = await User.findOne({email: email})
            if(isExists)
            {
                throw createError.Conflict(`${email} is ready been registered`);
            }
            console.log(await User.findOne({}))
            const user = new User({
                name: name,
                address: address,
                birthdate: birthdate,
                email: email,
                password: password
            });
    
            const savedUser = await user.save();
            
            return res.json({ 
                status: '200',
                element: savedUser
            })
        }
        catch(error)
        {
            next(error);
        }
    
    
    },

    refreshToken: async (req, res, next) => {
        try{
            const {refreshToken} = req.body
            if(!refreshToken){
                throw createError.BadRequest();
                
            }
            
            const {userId} = await verifyRefreshToken(refreshToken);
            const accessToken = await signAccessToken(userId);
            const newRefreshToken = await signRefreshToken(userId);
            res.json({accessToken, refreshToken:newRefreshToken});
        }
        catch(error)
        {
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {
            const {email, password} = req.body
            const {error} = userValidate(req.body)
            if (error) {
                throw createError(error.details[0].message)
            }
        
            const user = await User.findOne({email});
            if (!user) {
                throw createError.NotFound(`User not found`)
            }
        
            const isValid = await user.isCheckPassword(password);
            if (!isValid) {
                throw createError.Unauthorized();
            }
            
            const accessToken = await signAccessToken(user._id);
            const refreshToken = await signRefreshToken(user._id)
            res.json({
                "status":"200",
                accessToken,
                refreshToken,
                links: {
                    current_user_info: "http://localhost:3000/user/getinfo"
                }
            })
        }
        catch(error) {
            next(error)
        }
    },

    logout: async (req, res, next) => {
        try{
            const {refreshToken} = req.body
            if(!refreshToken) throw createError.BadRequest()
    
            const {userId} = await verifyRefreshToken(refreshToken)
            let delRefreshToken = await client.del(userId.toString())
            return res.json({message: 'Logout!'})
        }
        catch(error){
            next(error)
        }
    },

    getlist: async (req, res, next) => {
        const listUsers = [
            {
                email: "abc@gmail.com"
            },
            { 
                email: "bdc@gmail.com"
            }
        ]
        res.json({listUsers});
    }, 

    getinfo: async (req, res, next) =>{
        const {userId} = req.payload
        const userInfo = await User.findById(userId)

        res.json({
            "status": "200",
            userInfo: {
                "name": userInfo.name,
                "address": userInfo.address,
                "birthdate": userInfo.birthdate,
                "email": userInfo.email
                }
        });
    }
}