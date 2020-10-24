import axios from 'axios';
const index= async(req , res)=>{

        await  axios.get(`https://napi.arvancloud.com/vod/2.0/audios/${req.query.link}`, {
            headers: {
                'Authorization': process.env.ArvanApiKey,
                'Accept': 'application/json'
            }
        }).then(res => {
                res.json({
                    data:response.data,
                })
            })
            .catch(err =>{
            res.json({
                status:err,
            })
        })

};
export default index;