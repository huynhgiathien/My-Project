const JWT = require('jsonwebtoken')
const createError = require('http-errors')

const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: "1h"
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
        console.log(err)
        if(err) { return next(createError.Unauthorized())}
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

        JWT.sign(payload, secret, options, (error, token) => {
            if (error) {
                reject(error);
            }
            resolve(token);
        })
    })
}

module.exports = {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken
}