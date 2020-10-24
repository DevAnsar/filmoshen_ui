import Router from 'next/router';
import axios from 'axios';
import {AUTHENTICATE, DEAUTHENTICATE} from '../types';
import {removeCookie, setCookie} from '../../utils/cookie';

// gets token from the api and stores it in the redux store and in cookie
const sendCode = ({mobile}, type) => {
    if (type !== 'api/site/login/sendCode') {
        throw new Error('Wrong API call!');
    }
    return (dispatch) => {
        axios.post(`${process.env.BaseUrl}/${type}`, {mobile})
            .then((response) => {
                setCookie('token', response.data.user.api_token);
                Router.push('/');
                dispatch({type: AUTHENTICATE, payload: response.data.user.api_token});
            })
            .catch((err) => {
                throw new Error(err);
            });
    };
};

// gets token from the api and stores it in the redux store and in cookie
const authenticate = ({mobile, loginCode}, type) => {
    if (type !== 'api/site/register' && type !== 'api/site/login/checkCode') {
        throw new Error('Wrong API call!');
    }
    return (dispatch) => {
        axios.post(`${process.env.BaseUrl}/${type}`, {mobile, loginCode})
            .then((response) => {
                if (response.data.status === 1) {
                    setCookie('token', response.data.api_token);
                    Router.push('/');
                    dispatch({type: AUTHENTICATE, payload: response.data.api_token});
                } else {
                    return response;
                }
            })
            .catch((err) => {
                throw new Error(err);
            });
    };
};
// gets token from the api and stores it in the redux store and in cookie
const authenticate2 = (api_token , callback='/') => {
    return (dispatch) => {
        setCookie('token', api_token);
        Router.push(callback);
        dispatch({type: AUTHENTICATE, payload: api_token});

    };
};
const authenticate3 = (api_token) => {
    return (dispatch) => {
        setCookie('token', api_token);
        dispatch({type: AUTHENTICATE, payload: api_token});

    };
};

// gets the token from the cookie and saves it in the store
const reauthenticate = (token) => {
    return (dispatch) => {
        dispatch({type: AUTHENTICATE, payload: token});
    };
};

// removing the token
const deauthenticate = () => {
    return (dispatch) => {
        removeCookie('token');
        Router.push('/');
        dispatch({type: DEAUTHENTICATE});
    };
};


export default {
    authenticate,
    authenticate2,
    authenticate3,
    reauthenticate,
    deauthenticate,
};
