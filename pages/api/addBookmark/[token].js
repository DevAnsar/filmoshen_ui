import React from 'react';
import axios from 'axios';

const getBookmark= async(req,res)=>{

    // res.json({status:true,type:'add'});
    let apiUrl=`${process.env.BaseUrl}/api/v1/addBookmark/${req.query.token}?api_token=${req.cookies.token}`;
    axios.get(apiUrl)
        .then(response=>{

            console.log(response);
            if (response.data.status === 1){
                res.json({status:true,type:'add'});
            }
        })
        .catch(err=>console.log(err));


};

export default getBookmark;
