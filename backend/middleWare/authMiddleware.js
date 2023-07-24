import jwt from 'jsonwebtoken'

import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
const verifyToken =asyncHandler( async(req, res, next)=>{
   let headers=  req.headers
   if(!headers){
    res.status(401)
    throw new Error('Not authorized, no headers')
   
   }
   let token = headers['authorization'].split(' ')[1]

    if(token){
        try{
            let decoded  = jwt.verify(token, process.env.JWT_SECRET)
                req.user = await User.findById(decoded.userId).select('-password')
            next()
        }catch(error){
            res.status(401)
            throw new Error('Not authorized, invalid token')
        }
    }else{
        res.status(401)
        throw new Error('Not authorized, no token')
    }

})

export {verifyToken}