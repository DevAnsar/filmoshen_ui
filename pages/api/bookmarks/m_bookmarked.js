import axios from 'axios';
const m_bookmarked= async (req ,res)=>{

    if (req.cookies.token){
        await  axios.get(`${process.env.BaseUrl}/api/v1/m_bookmarked?api_token=${req.cookies.token}`)
            .then(response=>{
                res.json({
                    status:true,
                    m_bookmarks:response.data.m_bookmarks,
                    user:response.data.user,
                })
            })
            .catch(err=>console.log(err))

    }else {
        res.json({status:false})
    }
};
export default m_bookmarked;