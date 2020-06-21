import axios from "axios/index";

const musicLike= async (req,res)=>{
    await  axios.post(`${process.env.BaseUrl}/api/v1/musicLike?api_token=${req.cookies.token}`,{
        token:req.query.token
    })
        .then(response=>{
            res.json({data:response.data,})
        })
        .catch(err=>console.log(err))

};

export default musicLike;