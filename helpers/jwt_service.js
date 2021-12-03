const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const client = require('./connection_redis')

const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: "5m"
        }

        JWT.sign(payload, secret, options, (error, token) => {
            if (error) {
                reject(error);
            }
            resolve(token);
        })
    })
}

const verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return next(createError.Unauthorized)
    }
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    ///Verify token
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) =>{
        if(err) {
            if(err.name === 'JsonWebTokenError')
            {
                return next(createError.Unauthorized())
            }
            return next(createError.Unauthorized(err.message));
            }
        req.payload = payload
        next();
    })
}

const signRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn: "1y"
        }

        JWT.sign(payload, secret, options, async (error, token) => {
            try{
                let refTokenRedis = await client.set(userId.toString(), token, { 'EX': 365 * 24 * 60 * 60 })
                resolve(token);
            }
            catch(error){
                reject(error);
            }
        })
    })
}

const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload)=>{
            try{
                if(err) reject(err); //Catch invalid token
                let rfToken = await client.get(payload.userId)
                if (rfToken === refreshToken) {
                    return resolve(payload)
                }
                return reject(createError.Unauthorized()); //Check token isexist in redis db
            }
            catch(err){
                reject(createError.InternalServerError());
            }
        })
    })
}

module.exports = {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken
}