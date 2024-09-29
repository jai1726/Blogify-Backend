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
}

})

export default mongoose.model("User",userSchema);