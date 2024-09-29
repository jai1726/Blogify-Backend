import Blog from "../models/Blog.models.js";

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
      const { tittle, description, image, user}=req.body;
    const blog = new Blog({
        tittle,
         description, 
         image, 
         user 
    })
 try{
  await blog.save();
 }catch(err){
    return console.log(err);
 }
 return res.status(200).json({blog});
}

export const updateBlog = async (req, res, next) => {
    const { tittle, description }=req.body;
    const blogId = req.params.id.trim();
    let blog;
    try{
        blog = await Blog.findByIdAndUpdate(blogId, {
            tittle,
            description
        })
    }catch(err){
        return console.log("erro",err);
    }
     if(!blog)return res.status(404).json({mesage:"Unable to Update"})
    return res.status(200).json({blog});

}

export const getById = async (req, res, next) => {
    const blogId = req.params.id.trim();
    let blog;
    try{
        blog = await Blog.findById(blogId);
    }catch(err){
        return console.log("erro",err);
    }
     if(!blog)return res.status(404).json({mesage:"Unable to Update"})
    return res.status(200).json({blog});
}

export const deleteBlog = async (req, res, next) => {
    const blogId = req.params.id.trim();
    let blog;
    try{
        blog = await Blog.findByIdAndDelete(blogId);
    
    }catch(err){
        return console.log("erro",err);
    }
    if(!blog)return res.status(500).json({mesage:"Unable to Delete"})

        return res.status(200).json({message:"Suuceesfully Delete"});
}