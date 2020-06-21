import axios from 'axios';
import Movie from '../../components/movie/Movie'
import {connect} from "react-redux";
import initialize from "../../utils/initialize";
import { getCookie } from '../../utils/cookie';

function movieWithToken({movie, actors, factors, imdbData,bookmark_status,comments,movie_type,movie_access}) {

    console.log('comments',comments);
    return (
        <>
            {/*{console.log('imdbData', imdbData)}*/}
            <Movie movie={movie}
                   movie_type={movie_type}
                   actors={actors}
                   factors={factors}
                   // imdb={imdbData}
                   bookmark={bookmark_status}
                   comments={comments}
                   movie_access={movie_access}
            />
        </>
    )
}
movieWithToken.getInitialProps = async (ctx) => {
    initialize(ctx);
    let {query} = ctx;
    let movie = [];
    let actors = [];
    let factors = [];
    let comments = [];
    // let imdb_data = [];
    let Bookmark='';
    let movie_type='';
    let user_movie_access=false;

    let api=`${process.env.BaseUrl}/api/site/m/${query.token}`;
    // const token = ctx.store.getState().authentication.token;
    // if (token){
    //     api=api+`?api_token=${token}`;
    // }
    if(ctx.isServer) {
        if(ctx.req.headers.cookie) {
           const token=getCookie('token', ctx.req);
           api=api+`?api_token=${token}`;
        }
    } else {
        const token = ctx.store.getState().authentication.token;
        api=api+`?api_token=${token}`;
    }


    await axios.get(api).then(response => {

        movie = response.data.movie;
        movie_type = response.data.movie_type;
        Bookmark =response.data.bookmark;
        actors = response.data.actors;
        factors = response.data.factors;
        comments = response.data.comments;
        user_movie_access = response.data.user_movie_access;

    }).catch(error => console.log(error));

    // if (movie.imdb_id) {
    //     await axios.post(`http://www.omdbapi.com/?apikey=ead1d321&i=${movie.imdb_id}`).then(response => {
    //         imdb_data = response.data;
    //     }).catch(error => console.log(error));
    // }

    return {
        movie: movie,
        movie_type: movie_type,
        actors: actors,
        factors: factors,
        // imdbData: imdb_data,
        bookmark_status:Bookmark,
        comments:comments,
        movie_access:user_movie_access,
    }
};


export default connect(state => state)(movieWithToken);