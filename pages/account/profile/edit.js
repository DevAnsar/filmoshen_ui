import ProfileEdit from './../../../components/Account/pages/ProfileEdit';
import axios from "axios/index";
import {API} from "../../../config";
import { connect } from 'react-redux';
import initialize from "../../../utils/initialize";
import Router from 'next/router';
import unauthinticated from "../../UnAuth";
function edit({user}) {

    function redirect() {
        setTimeout(()=>{
            Router.push('/')
        },2000)
    }
    return (
        <>
        {(user && (
            <ProfileEdit user={user}/>
        )) || (
            <unauthinticated />
        )}
        </>
    )
}

edit.getInitialProps = async ctx => {
    initialize(ctx);
    const token = ctx.store.getState().authentication.token;
    if (token) {
        const response = await axios.get(`${process.env.BaseUrl}/api/site/user?api_token=${token}`, {
            // headers: {
            //   authorization: token
            // }
        });
        const user = response.data.user;
        return {
            user
        };
    }
};

export default connect((state => state))(edit);