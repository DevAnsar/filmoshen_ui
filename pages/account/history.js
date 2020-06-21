import History from './../../components/Account/pages/History';
import React from 'react'
import {connect} from "react-redux";
import initialize from "../../utils/initialize";
import axios from "axios/index";
import {API} from "../../config";


function history({user}) {
    return (
        <History user={user}/>
    )
}

history.getInitialProps =async ctx => {
    initialize(ctx);

    let movies=[];
    let user=false;
    const token = ctx.store.getState().authentication.token;
    if (token) {
        await axios.get(`${API}/api/v1/bookmarked?api_token=${token}`, {
            // headers: {
            //   authorization: token
            // }
        }).then(response=>{
            movies=response.data.bookmarks,
                user=response.data.user
        });
        // const user = response.data.user;
        return {
            movies : movies,
            user : user,
        };
    }

};

export default connect(state => state)(history);