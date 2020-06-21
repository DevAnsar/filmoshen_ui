import Music from '../../components/music/Music'
import initialize from "../../utils/initialize";


function musicWithToken({token}) {

    return (
        <>
            {/*{token}*/}
            <Music token={token} />
        </>
    )
}
musicWithToken.getInitialProps = (ctx) => {
    initialize(ctx);
    let {query} = ctx;

    return {
        token: query.token,
    }
};
export default musicWithToken;