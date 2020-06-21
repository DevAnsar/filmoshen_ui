import axios from 'axios';
const payments= async (req ,res)=>{

    if (req.cookies.token){
        await  axios.get(`${process.env.BaseUrl}/api/v1/mypayments?api_token=${req.cookies.token}`)
            .then(response=>{
                res.json({
                    status:true,
                    mypayments:response.data.mypayments,
                    user:response.data.user,
                })
            })
            .catch(err=>console.log(err))

    }else {
        res.json({status:false})
    }
};
export default payments;