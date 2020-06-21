import Layout from "../Layout";
import {MovieCard} from "./../../../components/movie/MovieCard";

function SavedMovies({movies,user}) {

    console.log('bookmarks',movies);

    return(
        <Layout user={user}>
            {
                movies?.map(movie=><MovieCard key={movie.token} movie={movie}/>)
            }
        </Layout>
    )
}




export  default SavedMovies;