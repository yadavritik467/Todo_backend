import express from "express"
import Post from "../modal/post.js"
// import { requireSignIn } from "../middleware/requireSign.js"
const router = express.Router()

router.get("/get", async (req,res)=>{
  const text = await Post.find({})
  res.status(200).json({message:" all status  ",text})

} )


router.post("/post", async(req,res)=>{
    const {title,description,dueDate,status,assignUser,user,name} = req.body
   

    const text = await Post.create({title,description,dueDate,status,assignUser,user,name})

    // await text.save()
    res.status(200).json({message:" task created ",text})


} )



router.put("/edit/:id",async(req,res)=>{
   
   try {
    const title = req.body.title
    const description = req.body.description
    const status = req.body.status
    const text = await Post.findById(req.params.id)
    text.title = title;
    text.description = description;
    text.status = status;
      await text.save()
    res.status(200).json({message:" task edited  " ,text})
   } catch (error) {
    console.error(error)
   }

} )



router.delete("/delete/:id", async(req,res)=>{
   

    const text = await Post.findByIdAndDelete(req.params.id)
   
    res.status(200).json({message:" task deleted  "})


}  )


export default router