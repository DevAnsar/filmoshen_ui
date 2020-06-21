import axios from "axios/index";

const MovieLike= async (req,res)=>{
    await  axios.post(`${process.env.BaseUrl}/api/v1/movieLike?api_token=${req.cookies.token}`,{
        token:req.query.movie_token,
        type:req.query.type,
    })
        .then(response=>{
            res.json({
                // token:response.data,
                like_status:response.data.like_status,
                counts:response.data.counts
            })
        })
        .catch(err=>console.log(err))

};

export default MovieLike;