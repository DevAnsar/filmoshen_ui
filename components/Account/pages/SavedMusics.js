import Layout from "../Layout";
import {MusicCard} from "./../../../components/music/MusicCard";

function SavedMovies({musics,user}) {

    console.log('m_bookmarks',musics);

    return(
        <Layout user={user}>
            {
                musics?.map(music=><MusicCard key={music.token} music={music}/>)
            }
        </Layout>
    )
}




export  default SavedMovies;