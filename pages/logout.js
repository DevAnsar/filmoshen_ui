import Logout from './../components/Auth/Logout';
import {connect} from "react-redux";
import initialize from "../utils/initialize";
import actions from "../redux/actions";

function logout({deauthenticate}) {

    return (
        <>
            {deauthenticate}
            {/*<Logout/>*/}
            {/*/!*<h2>ansaramman</h2>*!/*/}
        </>
    )
}
logout.getInitialProps = async ctx => {

};

export default connect(state => state,actions)(logout);