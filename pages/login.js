import React from 'react';
import {connect} from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import reboot from './../style/reboot.module.css';
import axios from 'axios';
import {Col, Row, Spinner} from 'react-bootstrap';

import ToastsAlert from "../components/ToastsAlert";
import Link from 'next/link';

let commentMessageTimeOut;

class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            mobile: '',
            password: '',
            loginCode: '',
            mobileError: '',
            passError: '',
            loginCodeError: '',

            type: 'login',

            alert: false,
            alertMessage: '',
            alertColor: '#fd3746',

            passLoginLoading: false,
            sendCodeLoginLoading: false,
            codeLoginLoading:false,
        };
    }


    static getInitialProps(ctx) {
        initialize(ctx);
    }

    alertTimeOutHandle() {
        clearTimeout(commentMessageTimeOut);
        commentMessageTimeOut = setTimeout(() => {
            this.setState({alert: false});
        }, 4000);
    }

    handleLogin(e) {

        e.preventDefault();

        this.setState({
            passLoginLoading: true,
            mobileError: '',
            passError: '',
        });

        if (this.state.mobile.length === 11 && this.state.password.length >= 8) {
            return this.getLogin();
        } else {

            if (this.state.mobile.length !== 11) {
                this.setState({
                    mobileError: 'شماره موبایل صحیح نمیباشد',
                    passLoginLoading: false,
                });
            }
            if (this.state.password.length < 8) {
                this.setState({
                    passError: 'رمز عبور باید بیشتر از 8 کاراکتر باشد',
                    passLoginLoading: false,
                });
            }
            // this.setState({
            //     alertMessage: 'شماره موبایل صحیح نمیباشد',
            //     alert: true
            // });
            // this.alertTimeOutHandle();
        }
    }

    getLogin() {
        axios.post(`${process.env.BaseUrl}/api/site/login`, {
            mobile: this.state.mobile,
            password: this.state.password
        })
            .then(response => {
                // console.log(response);
                this.setState({
                    passLoginLoading: false,
                });
                let {status, message} = response.data;
                if (status === 1) {
                    this.props.authenticate2(response.data.api_token);
                } else if (status === -2) {
                    console.log('message', message);
                    this.setState({
                        alertMessage: 'رمز ورود اشتباه اشت',
                        alert: true
                    });
                    this.alertTimeOutHandle();
                }
            }).catch(error => {
            this.setState({
                passLoginLoading: false,
                alertMessage: 'مشکلی پیش آمد.دوباره تلاش کنید',
                alert: true
            });
            this.alertTimeOutHandle();
        })
    }

    handleSendCode(e) {
        e.preventDefault();
        if (this.state.mobile.length === 11) {
            return this.sendCode();
        } else {
            this.setState({
                sendCodeLoginLoading:false,
                alertMessage: 'شماره موبایل صحیح نمیباشد',
                alert: true
            });
            this.alertTimeOutHandle();
        }

    }

    sendCode() {
        axios.post(`${process.env.BaseUrl}/api/site/login/sendCode`, {
            mobile: this.state.mobile
        })
            .then(response => {
                console.log(response);
                if (response.data.status === 1) {
                    this.setState({
                        type: 'code',
                        sendCodeLoginLoading:false,
                    })
                }
            })
    }

    handleCheckCode(e) {
        e.preventDefault();
        if (this.state.loginCode.length === 5) {

            this.setState({
                codeLoginLoading:true
            });
            axios.post(`${process.env.BaseUrl}/api/site/login/checkCode`,
                {mobile: this.state.mobile, loginCode: this.state.loginCode})
                .then((response) => {

                    if (response.data.status === 1) {
                        this.setState({
                            codeLoginLoading:false
                        });
                        this.props.authenticate2(response.data.api_token);
                    } else {
                        let status = response.data.status;
                        if (status === -3) {
                            this.setState({
                                loginCodeError: 'کد وارد شده صحیح نیست',
                                codeLoginLoading:false
                            })
                        } else {
                            this.setState({
                                loginCodeError: 'مشکلی به وجود آمد دوباره تلاش کنید',
                                codeLoginLoading:false
                            })
                        }
                    }
                })
                .catch((err) => {
                    this.setState({
                        loginCodeError: 'مشکلی به وجود آمد دوباره تلاش کنید',
                        codeLoginLoading:false
                    })
                });


            // this.props.authenticate(
            //     {mobile: this.state.mobile, loginCode: this.state.loginCode},
            //     'api/site/login/checkCode'
            //     // 'signin'
            // );


        }
        else {
            this.setState({
                alertMessage: 'کد پنج رقمی را صحیح وارد کنید',
                alert: true
            });
            this.alertTimeOutHandle();
        }
    }

    mobileBox() {

        return (
            <div className='input-group py-2'>
                <div className="input-group mb-3 mt-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{width: '40px'}}>
                            <i className="fas fa-mobile-alt color-orange"/>
                        </span>
                    </div>
                    <input
                        required
                        value={this.state.mobile}
                        onChange={e => this.setState({mobile: e.target.value})}
                        type="text" className="form-control  font-md"
                        placeholder="شماره موبایل"/>
                    <Col xs={12} style={{minHeight: '15px'}}>
                        <label className='f6 text-danger'>{this.state.mobileError}</label>
                    </Col>
                </div>

                <div className="input-group mb-3 mt-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{width: '40px'}}>
                            <i className="fas fa-key color-orange"/>
                        </span>
                    </div>
                    <input
                        required
                        value={this.state.password}
                        onChange={e => this.setState({password: e.target.value})}
                        type="password" className="form-control  font-md"
                        placeholder="رمز ورود"/>
                    <Col xs={12} style={{minHeight: '15px'}}>
                        <label className='f6 text-danger'>{this.state.passError}</label>
                    </Col>
                </div>

                <div className="input-group ">

                    <Col xs={6} md={6} lg={4} className={`pr-0`}>
                        <button disabled={this.state.passLoginLoading} onClick={this.handleLogin.bind(this)}
                                className="btn btn-warning text-white f8 mb-2">


                            <span className="pl-2">ورود</span>
                            {
                                this.state.passLoginLoading ? <Spinner
                                    className="mb-1"
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> : ''
                            }
                        </button>
                    </Col>

                    <Col xs={6} md={6} lg={8} style={{textAlign: 'end'}} className={`pl-0`}>
                        <div>
                        <span className={`f5 ml-2`}>
                           رمز خود را فراموش کرده اید؟
                        </span>

                            <button disabled={this.state.sendCodeLoginLoading}  onClick={this.handleSendCode.bind(this)}
                                    className="btn  btn-warning text-white  f8">


                                <span className="pl-2">ارسال رمز به موبایل</span>
                                {
                                    this.state.sendCodeLoginLoading ? <Spinner
                                        className="mb-1"
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    /> : ''
                                }
                            </button>
                        </div>
                    </Col>

                    {/*<Col xs={7} md={7} lg={7}>*/}
                    {/*<Link href={`/register`}>*/}
                    {/*<a className="mt-3 mb-2 f6 mx-2 " style={{float: 'left'}}>تا حالا عضو*/}
                    {/*نشده*/}
                    {/*اید؟*/}
                    {/*</a>*/}
                    {/*</Link>*/}
                    {/*</Col>*/}
                </div>
            </div>
        )
    }

    loginCodeBox() {

        return (
            <div className='input-group'>
                <div className="input-group mb-3 mt-2">
                    <div className="input-group-prepend">
                                                <span className="input-group-text"><i
                                                    className="fas fa-mail-bulk color-orange"/></span>
                    </div>
                    <input
                        required
                        value={this.state.loginCode}
                        onChange={e => this.setState({loginCode: e.target.value})}
                        type="number" className="form-control  font-md"
                        placeholder="کد"/>

                    <Col xs={12}>
                        <label className='f6 danger'>{this.state.loginCodeError}</label>
                    </Col>
                </div>
                <div className="input-group">

                    <Row className="input-group " xs={12}>

                        <Col xs={5}>
                            <button disabled={this.state.codeLoginLoading} onClick={this.handleCheckCode.bind(this)}
                                    className="btn btn-warning text-white mt-3 mb-2 f8">

                                <span className="pl-2">ورود</span>
                                {
                                    this.state.codeLoginLoading ? <Spinner
                                        className="mb-1"
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    /> : ''
                                }
                            </button>
                        </Col>

                        <Col xs={5}>
                            <a className="mt-3 mb-2 f6 mx-3 " style={{float: 'left', cursor: 'pointer'}} onClick={e => {
                                e.preventDefault();
                                this.setState({
                                    mobileError: '',
                                    loginCode: '',
                                    loginCodeError: '',
                                    level: 1
                                })
                            }}>
                                تغییر شماره
                            </a>
                        </Col>
                    </Row>

                </div>
            </div>
        )
    }

    render() {

        return (
            <>
                <ToastsAlert alert_show={this.state.alert} message={this.state.alertMessage}
                             color={this.state.alertColor}/>
                <div className={`container-fluid pb-5 pt-5 px-lg-4 px-md-4 ${reboot.rtl}`}
                     style={{backgroundColor: '#fafafa'}}>
                    <div className="row py-4 justify-content-center">
                        <div className="col-11 col-md-4 mt-2">
                            <div className="bg-white border" style={{height: '100%'}}>
                                <div className="frm pt-4 bg-white px-3 py-3 ">

                                    <div className={`row mb-4`}>
                                        <div className='col-6'>
                                            <h6 className="text-blue  color-red mb-3">ورود به
                                                {
                                                    ' ' + process.env.AppName
                                                }
                                            </h6>
                                        </div>

                                        <div className='col-6 ' style={{textAlign: 'end'}}>
                                            <Link href={`/register`} className="text-blue  color-red mb-3">
                                                <a className='btn btn-sm text-white btn-success'>
                                                    ایجاد حساب کاربری
                                                </a>
                                            </Link>
                                        </div>
                                    </div>

                                    {this.state.type === 'login' ?
                                        this.mobileBox()
                                        :
                                        this.loginCodeBox()}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default connect(
    state => state,
    actions
)(login);