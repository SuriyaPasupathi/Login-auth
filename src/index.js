const express=require("express")
const app=express()
const cors=require("cors")
const path=require("path")
require("dotenv").config()
const mongoose=require("mongoose")

//Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))  //formdata append
app.use("/",express.static(path.join(__dirname,""))) //Image upload


//DB connection
mongoose.connect(process.env.MONG0DB_CONNECTION).then((state)=>{
    console.log("Connected to MongoDB")
}).catch((err)=>{
    console.log(err)
})

app.use("/api/v2/user",require("../routes/userRoutes"))

app.all("*",(req,res)=>{
    return res.status(404).json({message:"Not Found"})
})


app.listen(process.env.PORT,()=>{
    console.log("Server is running on port "+ process.env.PORT)
})


