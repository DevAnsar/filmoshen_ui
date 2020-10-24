import PasswordEdit from './../../../components/Account/pages/PasswordEdit';
import axios from "axios/index";
import { connect } from 'react-redux';
import initialize from "../../../utils/initialize";
import unauthinticated from "../../UnAuth";
function password({user}) {
    return (
        <>
        {(user && (
            <PasswordEdit user={user}/>
        )) || (
            <unauthinticated />
        )}
        </>
    )
}

password.getInitialProps = async ctx => {
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

export default connect((state => state))(password);