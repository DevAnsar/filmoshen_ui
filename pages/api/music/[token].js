import axios from "axios";

const music= async (req,res)=>{
    await  axios.get(`${process.env.BaseUrl}/api/v1/music/${req.query.token}?api_token=${req.cookies.token}`)
        .then(response=>{
            res.json({
                data:response.data,
            })
        })
        .catch(err=>console.log(err))

};

export default music;