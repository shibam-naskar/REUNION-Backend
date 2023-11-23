const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const SALT = 10
const JWT_SECRET = process.env.JWT_SECRET



exports.signupUser =  async (req,res) => {
    const {email,password} = req.body;
    try {
        const existingUser = await userModel.findOne({email:email})
        if(existingUser){
            return res.status(400).json({success:false,"messege":"User already exists"})
        }

        if(!emailRegex.test(email)){
            return res.status(400).json({success:false,"messege":"Email Not Valid"})
        }

        const hashPassword = await bcrypt.hash(password,SALT)

        const result = await userModel.create({
            email:email,
            password:hashPassword
        })

        const token = jwt.sign({email:email,id:result._id},JWT_SECRET)
        return res.status(201).json({success:true,user:result,token:token})
    } catch (error) {
        return res.status(400).json({success:false,messege:error})
    }
}


exports.signinUser = async(req,res)=>{
    const {email,password} = req.body;

    try {
        const existingUser = await userModel.findOne({email:email})
        if(!existingUser){
            return res.status(404).json({success:false,"messege":"User Not Found"})
        }

        const matchPassword = await bcrypt.compare(password,existingUser.password)
        if(!matchPassword){
            return res.status(400).json({success:false,"messege":"Invalid Credentials"})
        }

        const token = jwt.sign({email:existingUser.email,id:existingUser._id},JWT_SECRET)
        return res.status(201).json({success:true,user:existingUser,token:token})
    } catch (error) {
        return res.status(400).json({success:false,messege:error})
    }

}