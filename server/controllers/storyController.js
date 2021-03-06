const Post = require("../models/Post")
// const ejs=require("ejs");

class postController{
    async getStory(req,res) {
       try {
        const posts =  await Post.find({});
        // res.json({success:true,posts})
        // console.log(posts)
        if(req.url==='/'){
            res.render('index',{posts:posts})
        }else
        {
            res.render('admin/story',{posts:posts})
        }
       } catch (error) {
           console.log("Error model : " + error)
           res.status(500).json({success:fail,message:"Lỗi server"})
       }
    }
    async createStory(req,res){
        try {
            const {nameStory,desStory,imgStory}=req.body;
            const newPost= new Post({
                title:nameStory,
                description:desStory,
                imgUrl:imgStory
            })
            await newPost.save()
            res.redirect('back')
        } catch (error) {
            console.log("Error model : " + error)
            res.status(500).json({success:fail,message:"Lỗi server"})
        }
    }
    
    async deleteStory(req,res) {
        try {
         const posts =  await Post.deleteOne({ _id: req.params.id })
         res.redirect('back')
         console.log("xoá thành công")

        } catch (error) {
            console.log("Error model : " + error)
            res.status(500).json({success:fail,message:"Lỗi server"})
        }
    }

    // async findPost(req,res) {
    //     try {
    //      const posts =  await Post.findById({_id: req.params.id })
    //      res.json({success:true,posts})
    //      console.log("tìm thành công")

    //     } catch (error) {
    //         console.log("Error model : " + error)
    //         res.status(500).json({success:fail,message:"Lỗi server"})
    //     }
    // }

    async updateStory(req,res) {
        try {
            const data=req.body;
            let updateStory= {
                title:data.nameStory,
                description:data.desStory,
                imgUrl:data.imgStory
            }
            const updateStoryCondition={_id:req.params.id}
            updateStory=await Post.findOneAndUpdate(updateStoryCondition,updateStory,{new:true})
            if(!updateStory)
                return res.render('error',{message:"Cập nhật thất bại"})
            return res.redirect('back')
        } catch (error) {
            console.log("Error model : " + error)
            res.status(500).json({success:fail,message:"Lỗi server"})
        }
    }
    
}


 
module.exports = new postController()