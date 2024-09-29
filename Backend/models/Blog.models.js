import mongoose from "mongoose";

const blogSchema=new mongoose.Schema({
tittle:{
    type:String,
    unique:true,
    required:true
},
description:{
    type:String,
    required:true
},
image:{
    type:String,
    required:true,
},
user:{
    type:String,
    required:true,
}
})

export default mongoose.model("Blog",blogSchema);