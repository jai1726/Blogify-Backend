import express from "express";
import { getAllBlogs, addBlog, updateBlog, getById, deleteBlog, getUserBlogsbyId } from "../Controller/Blog.Controller.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add",addBlog);
blogRouter.put("/update/:id",updateBlog);
blogRouter.get("/:id", getById);
blogRouter.delete("/delete/:id",deleteBlog);
blogRouter.get("/user/:id", getUserBlogsbyId);

export default blogRouter;