import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
email:{
    type:String,
    unique:true,
    required:true
},
name:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true,
    minlength:6
},
blogs:[{
    type:mongoose.Types.ObjectId,
    ref:"Blog",
    required:true
}]

})

export default mongoose.model("User",userSchema);