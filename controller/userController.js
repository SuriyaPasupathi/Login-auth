const userModels=require("../model/userModel")
const asyncHandle=require("express-async-handler")
exports.createUser=asyncHandle(async(req,res)=>{
    try{
       const {name,email,password}=req.body
       if(!name || !email || !password){
        return res.status(400).json({message:"Please fill in all fields"})
       }
       const userExist=await userModels.findOne({email})
       if(userExist){
        return res.status(400).json({message:"Email already exist"})
       }
       const user=await userModels.create(req.body)
       return res.status(200).json({message:"Create user Successfully"})
    }catch(err){
        return res.status(400).json({message:err.message})
    }
})

exports.Loginuser=asyncHandle(async(req,res)=>{
    try{
       const {email,password}=req.body
       if( !email || !password){
        return res.status(400).json({message:"Please fill in all fields"})
       }
       const userExist=await userModels.findOne({email})
       if(!userExist){
        return res.status(400).json({message:"Email is NotFound"})
       }
      const isMatch = await userExist.comparePassword(password)
      if(!isMatch){
        return res.status(400).json({message:"Password is incorrect"})
      }
      
       
       return res.status(200).json({message:"Login Successfully"})
    }catch(err){
        return res.status(400).json({message:err.message})
    }
})