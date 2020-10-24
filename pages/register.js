import React from 'react';
import axios from 'axios';
import reboot from './../style/reboot.module.css';
import Link from 'next/link'
import {connect} from "react-redux";
import actions from "../redux/actions";


import initialize from '../utils/initialize';
import {Col, Row ,Spinner} from 'react-bootstrap';
import ToastsAlert from "../components/ToastsAlert";
import Router from 'next/router';

let commentMessageTimeOut;

class register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            password: null,
            name: '',
            email: '',

            level: 1,
            loginCode: '',
            loginCodeError: '',
            mobileError: '',
            passError: '',

            mobileAlert: '',
            alert: false,
            alertMessage: '',
            alertColor: '#fd3746',

            sendCodeLoading:false,
            codeCheckLoading:false,
            registerBoxLoading:false,
        };
    }

    static getInitialProps(ctx) {
        initialize(ctx);
    }

    //L1
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

                <div className="input-group ">

                    <Col xs={6} md={6} lg={6} className={`pr-0`}>
                        <button disabled={this.state.sendCodeLoading} onClick={this.handleCheckMobile.bind(this)}
                                className="btn btn-warning text-white mb-2 f6">

                            <span className="pl-2">ادامه</span>
                            {
                                this.state.sendCodeLoading ? <Spinner
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

                    <Col xs={6} md={6} lg={6} className={`pr-0`} style={{textAlign:'end'}}>
                        <Link href={`/login`} >
                            <a className="btn btn-light  mb-2 f6">
                                قبلا عضو شده اید؟
                            </a>
                        </Link>
                    </Col>
                </div>
            </div>
        )
    }

    handleCheckMobile() {
        if (this.state.mobile.length === 11) {
            this.sendCode();
        } else {
            let message = 'شماره موبایل صحیح نمی باشد';

            this.setState({
                alert: true,
                alertMessage: message
            });
            this.alertTimeOutHandle();
        }
    }

    sendCode() {
        this.setState({
            sendCodeLoading:true
        });
        axios.post(`${process.env.BaseUrl}/api/site/register/checkMobile`, {
            mobile: this.state.mobile
        })
            .then(response => {
                console.log(response);
                let {status} = response.data;
                if (status === -1) {
                    let message = 'شماره موبایل باید وارد شود';

                    this.setState({
                        alert: true,
                        alertMessage: message,
                        sendCodeLoading:false
                    });
                    this.alertTimeOutHandle();
                } else if (status === 2) {
                    let message = 'کاربر از قبل وجود دارد';

                    this.setState({
                        alert: true,
                        alertMessage: message,
                        sendCodeLoading:false
                    });
                    this.alertTimeOutHandle();
                } else if (status === 1) {
                    this.setState({
                        level: 2,
                        sendCodeLoading:false
                    })
                }
            })
    }

    //L2
    registerCodeBox() {

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
                        placeholder={` ورود کد ارسال شده به ${this.state.mobile}`}/>

                    <Col xs={12}>
                        <label className='f6 text-danger'>{this.state.loginCodeError}</label>
                    </Col>
                </div>
                <div className="input-group">

                    <Row className="input-group " xs={12}>

                        <Col xs={6}>
                            <button disabled={this.state.codeCheckLoading} onClick={this.handleCheckCode.bind(this)}
                                    className="btn btn-warning text-white mt-3 mb-2 f6">
                                <span className="pl-2">ادامه</span>
                                {
                                    this.state.codeCheckLoading ? <Spinner
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

                        <Col xs={6} style={{textAlign:'end'}}>
                            {/*<Link href={`/login`}>*/}
                                <a
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        this.setState({level:1})
                                    }}
                                    className="mt-3 mb-2 f6 mx-3 "
                                    style={{float: 'left', cursor: 'pointer'}}>
                                    کد ارسال نشد؟
                                </a>
                            {/*</Link>*/}
                        </Col>
                    </Row>

                </div>
            </div>
        )
    }
    handleCheckCode(e) {
        e.preventDefault();
        if (this.state.loginCode.length === 5) {

            this.setState({
                codeCheckLoading:true
            });
            axios.post(`${process.env.BaseUrl}/api/site/login/checkCode`,
                {mobile: this.state.mobile, loginCode: this.state.loginCode})
                .then((response) => {
                    let {status} = response.data;
                    if (status === 1) {
                        this.props.authenticate3(response.data.api_token);
                        this.setState({
                            loginCodeError:'',
                            codeCheckLoading:false
                        });
                        this.setState({level: 3});

                    } else {

                        if (status === -3) {
                            this.setState({
                                loginCodeError: 'کد وارد شده صحیح نیست',
                                codeCheckLoading:false
                            })
                        } else {
                            this.setState({
                                loginCodeError: 'مشکلی به وجود آمد دوباره تلاش کنید',
                                codeCheckLoading:false
                            })
                        }
                    }
                })
                .catch((err) => {
                    // throw new Error(err);
                    this.setState({
                        loginCodeError: 'مشکلی به وجود آمد دوباره تلاش کنید',
                        codeCheckLoading:false
                    })
                });


            // this.props.authenticate(
            //     {mobile: this.state.mobile, loginCode: this.state.loginCode},
            //     'api/site/login/checkCode'
            //     // 'signin'
            // );


        } else {
            this.setState({loginCodeError: 'کد پنج رقمی را صحیح وارد کنید'})
        }
    }

    //L3
    registerBox() {

        return (
            <>
                <div className="input-group mb-3 mt-2">
                    <div className="input-group-prepend">
                                    <span className="input-group-text"><i
                                        className="fas fa-mail-bulk color-orange"/></span>
                    </div>
                    <input value={this.state.name}
                           onChange={e => this.setState({name: e.target.value})}
                           type="text" className="form-control  font-md"
                           placeholder="نام کامل"/>
                </div>



                <div className="input-group mb-3 mt-2">
                    <div className="input-group-prepend">
                                    <span className="input-group-text"><i
                                        className="fas fa-mail-bulk color-orange"/></span>
                    </div>
                    <input value={this.state.email}
                           onChange={e => this.setState({email: e.target.value})}
                           type="email" className="form-control  font-md"
                           placeholder="ایمیل"/>
                </div>

                <div className="input-group mb-3 mt-2">

                    <div className="input-group-prepend">
                                    <span className="input-group-text"><i
                                        className="fas fa-mail-bulk color-orange"/></span>
                    </div>
                    <input value={this.state.password}
                           onChange={e => this.setState({password: e.target.value})}
                           type="password" className="form-control  font-md"
                           placeholder="رمز عبور"/>

                    <Col xs={12}>
                        <label className='f6 text-danger'>{this.state.passError}</label>
                    </Col>
                </div>


                <div className="form-group ">
                    <button disabled={this.state.registerBoxLoading}
                            onClick={this.handleRegisterForm.bind(this)} className="btn btn-warning mt-3 mb-2 f6">

                        <span className="pl-2">ثبت اطلاعات</span>
                        {
                            this.state.registerBoxLoading ? <Spinner
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

            </>
        )
    }

    handleRegisterForm() {

        let passLen = this.state.password.length;
        if (passLen >= 8) {
            this.sendData();
        } else {

            if (passLen < 8) {
                this.setState({passError: 'رمز نمیتواند کمتر از 8 کاراکتر باشد'})
            }

        }

    }

    async sendData() {
        this.setState({
            registerBoxLoading:true,
        });
        await  axios.post(`${process.env.BaseUrl}/api/site/register`, {
            'name': this.state.name,
            'mobile':this.state.mobile,
            'email': this.state.email,
            'password': this.state.password
        }).then(response => {
            console.log(response);
            let {status} = response.data;
            if (status === 1) {
                this.setState({registerBoxLoading:false,});
                Router.push('/');

            } else {
                if (status === -1) {
                    let message = 'مشکلی پیش آمد.لطفا از بخش ورود اقدام فرمایید';
                    this.setState({
                        alert: true,
                        alertMessage: message,
                        registerBoxLoading:false
                    });
                    this.alertTimeOutHandle();
                }
                if (status === -3) {
                    // this.setState({loginCodeError: 'کد وارد شده صحیح نیست'})
                } else if (status === -2) {
                    let message = 'متاسفانه مشکلی پیش آمد.لطفا از بخش ورود اقدام فرمایید';
                    this.setState({
                        registerBoxLoading:false,
                        alert: true,
                        alertMessage: message
                    });
                    this.alertTimeOutHandle();
                }
            }

        }).catch(error => {
            // console.log(error)
            let message = 'متاسفانه مشکلی در ثبت اطلاعات پیش آمد.لطفا از بخش ورود اقدام فرمایید';
            this.setState({
                registerBoxLoading:false,
                alert: true,
                alertMessage: message
            });
            this.alertTimeOutHandle();
        });
    }


    alertTimeOutHandle() {
        clearTimeout(commentMessageTimeOut);
        commentMessageTimeOut = setTimeout(() => {
            this.setState({alert: false});
        }, 4000);
    }

    render() {
        return (
            <div className={`container-fluid pb-5 pt-5 px-lg-4 px-md-4 ${reboot.rtl}`}
                 style={{backgroundColor: '#fafafa'}}>

                <ToastsAlert alert_show={this.state.alert} message={this.state.alertMessage}
                             color={this.state.alertColor}/>

                <div className="row py-4 justify-content-center">
                    <div className="col-11 col-md-4 mt-2">
                        <div className="bg-white border" style={{height: '100%'}}>
                            <div className="frm pt-4 bg-white px-3 py-3 ">

                                <h6 className="text-blue  color-red mb-3">ثبت نام در
                                    {
                                        ' ' + process.env.AppName
                                    }
                                </h6>


                                {this.state.level === 1 ?
                                    this.mobileBox() :
                                    this.state.level === 2
                                        ?
                                        this.registerCodeBox()
                                        :
                                        this.registerBox()}

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default connect(
    state => state,
    actions
)(register);