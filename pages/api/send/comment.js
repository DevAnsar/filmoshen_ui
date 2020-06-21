import axios from 'axios';
const comment= async (req ,res)=>{

    if (req.cookies.token){
    await  axios.post(`${process.env.BaseUrl}/api/v1/sendComment?api_token=${req.cookies.token}`,{
        comment:req.query.comment,
        commentable_id:req.query.movie_id,
        movie_type:req.query.movie_type,
    })
        .then(response=>{
            res.json({status:true,comment:response.data.comment})
        })
        .catch(err=>console.log(err))

    }else {
        res.json({status:false})
    }
};
export default comment;