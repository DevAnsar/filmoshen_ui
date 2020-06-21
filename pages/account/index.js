import SavedMovies from './../../components/Account/pages/SavedMovies';
import axios from "axios/index";
import { connect } from 'react-redux';
import initialize from "../../utils/initialize";
import Router from 'next/router';
import unauthinticated from "../UnAuth";
function index({user,movies}) {

    function redirect() {
        setTimeout(()=>{
            Router.push('/')
        },2000)
    }
    return (
        <>
        {(user && (
            <SavedMovies movies={movies} user={user} />
        )) || (
            <unauthinticated />
        )}
        </>
    )
}

index.getInitialProps = async ctx => {
    initialize(ctx);
    let movies=[];
    let user=false;
    const token = ctx.store.getState().authentication.token;
    if (token) {
        await axios.get(`${process.env.BaseUrl}/api/v1/bookmarked?api_token=${token}`, {
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

export default connect((state => state))(index);