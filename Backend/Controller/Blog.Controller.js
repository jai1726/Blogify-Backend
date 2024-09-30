import Blog from "../models/Blog.models.js";
import User from "../models/User.models.js";
import mongoose from "mongoose";

export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (err) {
        return console.log(err);
    }
    if (!blogs) {
        return res.status(400).json({ message: "No blogs" })
    }
    return res.status(200).json({ blogs });
}



export const addBlog = async (req, res, next) => {
    const { tittle, description, image, user } = req.body;
    const blog = new Blog({
        tittle,
        description,
        image,
        user
    })
    let existinguser;
    try {
        existinguser = await User.findById(user);
    } catch (err) {
        return console.log(err);
    }

    if (!existinguser) res.status(500).json({ message: "User not found using UsedId" });


    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        await blog.save({ session });

        existinguser.blogs.push(blog);

        await existinguser.save({ session });
        await session.commitTransaction();
        session.endSession();
    } catch (err) {
        console.log(err);
        return res.status(400).json({ err })
    }
    return res.status(200).json({ blog });
}



export const updateBlog = async (req, res, next) => {
    const { tittle, description } = req.body;
    const blogId = req.params.id.trim();
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            tittle,
            description
        })
    } catch (err) {
        return console.log("erro", err);
    }
    if (!blog) return res.status(404).json({ mesage: "Unable to Update" })
    return res.status(200).json({ blog });

}



export const getById = async (req, res, next) => {
    const blogId = req.params.id.trim();
    let blog;
    try {
        blog = await Blog.findById(blogId);
    } catch (err) {
        return console.log("erro", err);
    }
    if (!blog) return res.status(404).json({ mesage: "Unable to Update" })
    return res.status(200).json({ blog });
}



export const deleteBlog = async (req, res, next) => {
    const blogId = req.params.id.trim();
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(blogId).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (err) {
        return console.log("erro", err);
    }
    if (!blog) return res.status(500).json({ mesage: "Unable to Delete" })

    return res.status(200).json({ message: "Suuceesfully Delete" });
}



export const getUserBlogsbyId = async (req, res, next) => {
    const userId = req.params.id.trim();
    let userBlogs;
    try{
        userBlogs=await User.findById(userId).populate("blogs");

    }catch(err){
        return console.log(err);
    }
    if(!userBlogs){
        return res.status(404).json({message:"No blogs Found"})
    }
    return res.status(200).json({userBlogs})
    }