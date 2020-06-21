import axios from "axios/index";
import {connect} from 'react-redux';
import initialize from "../../utils/initialize";
import SavedMusics from "../../components/Account/pages/SavedMusics";

function index({user, musics}) {

    return (
        <>
            {(user && (
                <SavedMusics musics={musics} user={user}/>
            )) || (
                <unauthinticated/>
            )}
        </>
    )
}

index.getInitialProps = async ctx => {
    initialize(ctx);
    let Musics = [];
    let user = false;
    const token = ctx.store.getState().authentication.token;
    if (token) {
        await axios.get(`/api/bookmarks/m_bookmarked`)
            .then(response => {
                Musics = response.data.m_bookmarks;
                user = response.data.user
            });
        // const user = response.data.user;
        return {
            musics: Musics,
            user: user,
        };
    }
};

export default connect((state => state))(index);