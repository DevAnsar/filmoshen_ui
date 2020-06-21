import {useRef} from 'react';
import Master from './../../components/Master'
import reboot from './../../style/reboot.module.css'
import Link from 'next/link';
import {setCookie} from '../../utils/cookie';

import axios from 'axios';

// import AuthService from '../../utils/AuthService'

function Login() {
    // const auth = new AuthService();
    // useEffect(()=>{
    //     if (auth.loggedIn()) {
    //         // console.log('your loggedIn');
    //         Router.push('/account')
    //     }
    // });

    // function handleLoginForm(e)
    // {
    //     e.preventDefault();
    //     // yay uncontrolled forms!
    //     auth.login(emailRef.current.value,passRef.current.value)
    //         .then(res => {
    //             console.log('handleLoginForm',res);
    //             Router.push('/account');
    //             // this.props.url.replaceTo('/account');
    //         })
    //         .catch(e => console.log('handleLoginForm error',e))  // you would show/hide error messages with component state here
    // }

    function handleLoginForm(e) {
        e.preventDefault();
        // yay uncontrolled forms!
        axios.post(`${process.env.BaseUrl}/api/site/login`, {
            email: emailRef.current.value,
            password: passRef.current.value
        })
            .then(res => {
                console.log('handleLoginForm', res);

                setCookie('token', res.data.user.api_token);
                console.log('res', res);
                // Router.push('/');

                // Router.push('/account');
                // this.props.url.replaceTo('/account');
            })
            .catch(e => console.log('handleLoginForm error', e))  // you would show/hide error messages with component state here
    }

    function handleCheckCookie(e) {
        e.preventDefault();
        // yay uncontrolled forms!
        axios.post(`${process.env.BaseUrl}/api/site/checkCookie`)
            .then(res => {
                console.log('handleCheckForm', res);
            })
            .catch(e => console.log('handleCheckForm error', e))
    }

    const emailRef = useRef(null);
    const passRef = useRef(null);

    return (
        <Master>
            <div className={`container-fluid pb-5 pt-5 px-lg-4 px-md-4 ${reboot.rtl}`}
                 style={{backgroundColor: '#fafafa'}}>
                <div className="row py-4 justify-content-center">
                    <div className="col-11 col-md-4 mt-2">
                        <div className="bg-white border" style={{height: '100%'}}>
                            <div className="frm pt-4 bg-white px-3 py-3 ">

                                <h6 className="text-blue  color-red mb-3">ورود به ...</h6>

                                <div className="input-group mb-3 mt-2">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text"><i
                                        className="fas fa-mail-bulk color-orange"/></span>
                                    </div>
                                    <input ref={emailRef} type="email" className="form-control  font-md"
                                           placeholder="ایمیل"/>
                                </div>


                                <div className="input-group mb-3 mt-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i
                                            className="fa fa-phone color-orange"/></span>
                                    </div>
                                    <input ref={passRef} type="text" className="form-control font-md"
                                           placeholder="رمز عبور"/>
                                </div>


                                <div className="form-group ">
                                    <button onClick={handleLoginForm} className="btn btn-warning mt-3 mb-2 f6">ورود
                                    </button>
                                    <button onClick={handleCheckCookie} className="btn btn-info mt-3 mb-2 f6 mx-3">چک
                                    </button>
                                    <Link href={`/register`}>
                                        <a className="mt-3 mb-2 f6 mx-3 " style={{float: 'left'}}>تا حالا عضو نشده
                                            اید؟</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Master>
    )
}
export default Login;