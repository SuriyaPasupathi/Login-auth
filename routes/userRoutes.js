const route=require("express").Router()
const {createUser,Loginuser}=require("../controller/userController")
route.route("/create").post(createUser)
route.route("/login").post(Loginuser)
module.exports=route