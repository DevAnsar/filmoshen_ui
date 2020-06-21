import axios from 'axios';
const subscribe= async (req ,res)=>{

    if (req.cookies.token){
        await  axios.get(`${process.env.BaseUrl}/api/site/subscribe?api_token=${req.cookies.token}`)
            .then(response=>{
                res.json({
                    status:true,
                    subscribe:response.data.subscribe,
                    user_status:response.data.user_status,
                })
            })
            .catch(err=>console.log(err))

    }else {
        res.json({status:false})
    }
};
export default subscribe;