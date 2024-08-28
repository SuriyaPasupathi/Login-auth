const mongoose=require("mongoose");
const bcyrpt=require("bcrypt")
const userSchmea=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
   
})

userSchmea.pre("save",async function(next) {
    if(!this.isModified("password")) return next();
    this.password=await bcyrpt.hash(this.password,14)
    next()
})

userSchmea.methods.comparePassword=async function(password){
   return await bcyrpt.compare(password,this.password)
}


module.exports= mongoose.model("user",userSchmea)