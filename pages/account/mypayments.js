import MyPayments from './../../components/Account/pages/MyPayments'
import axios from "axios/index";
import {connect} from 'react-redux';
import initialize from "../../utils/initialize";

function mypayments({user, mypayments}) {

    return (
        <>
            {(user && (
                <MyPayments mypayments={mypayments} user={user}/>
            )) || (
                <div className='container text-center py-5 my-y alert-danger alert'>خطای کاربر</div>
            )}
        </>
    )
}

mypayments.getInitialProps = async ctx => {
    initialize(ctx);
    let Mypayments = [];
    let User = false;

    await axios.get(`/api/mypayments`)
        .then(response => {

            Mypayments = response.data.mypayments;
            User = response.data.user;
            console.log('myPayments', response)
        }).catch(error => {
            console.log('myPayments error', error);
        });
    // const user = response.data.user;
    return {
        mypayments: Mypayments,
        user: User,
    };

};

export default connect((state => state))(mypayments);