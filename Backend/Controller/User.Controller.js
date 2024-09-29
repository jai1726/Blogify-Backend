
import User from "../models/User.models.js";
import bcrypt from "bcryptjs";
export const  getAllUser =async(req,res,next)=>{
    let users;
     try{
     users=await User.find();
     }
     catch(err){
      return console.log(err);
     }
     if(!users){
        return res.status(404).json({message:"NO users Found"});
     }

        return res.status(200).json({users});
     
} 


export const  SignUp =async(req,res,next)=>{
   const {email,name,password}=req.body;
   let existinguser;
   try{
      existinguser=await User.findOne({email});
   }
   catch(err){
      return console.log(err);
   }
   if(existinguser)return res.status(400).json({message:"User already Exist | Login Instead"});
   const hashedPassword=bcrypt.hashSync(password);
   const user=new User({
   email,
   name,
   password:hashedPassword,
  });
 
  try{
      await user.save();
  }catch(err){
      return console.log(err);
  }
  return res.status(200).json({user});
}


export const  Login =async(req,res,next)=>{
   const {email,password}=req.body;
   let existinguser;
   try{
      existinguser=await User.findOne({email});
   }
   catch(err){
      return console.log(err);
   }
   if(!existinguser){
      return res
      .status(400)
      .json({message:"User Doesnt Exist | SignUp Instead"});
   }

   const isPasswordCorrect=bcrypt.compareSync(password,existinguser.password);
   if(!isPasswordCorrect){
      return res.status(404).json({messsage:"wrong password"})
   }
return res.status(200).json({message:"login Successful"});
}