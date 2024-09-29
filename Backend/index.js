import express from  "express";
import mongoose from "mongoose";
import router from "./Routes/User.Routes.js"
import blogRouter from "./Routes/Blog.Routes.js"

const app=express();
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);


const PORT=5000;

mongoose.connect("mongodb+srv://jagadeeshdende:nXtqmtE5l9M9s8s9@cluster0.tzk6i.mongodb.net/Connectify?retryWrites=true&w=majority&appName=Cluster0"
)
.then(()=>app.listen(PORT))
.then(()=>
    console.log("connected to Database and Listening to Localhost 5000"))
.catch((err)=>console.log(err));


// app.use("/api",(req,res,next)=>{
// res.send("hello world");
// })

// app.listen(5000);