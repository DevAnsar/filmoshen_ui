import axios from "axios/index";

const commentLike= async (req,res)=>{
    await  axios.post(`${process.env.BaseUrl}/api/v1/sendLike?api_token=${req.cookies.token}`,{
        comment_id:req.query.comment_id,
        type:req.query.type,
    })
        .then(response=>{
            res.json({
                like_status:response.data.like_status,
                comment:response.data.comment
            })
        })
        .catch(err=>console.log(err))

};

export default commentLike;