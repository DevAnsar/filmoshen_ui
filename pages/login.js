import React from 'react';
import {connect} from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import reboot from './../style/reboot.module.css';
import axios from 'axios';
import Link from 'next/link';
import {Col, Row} from 'react-bootstrap';


class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            loginCode: '',
            mobileError: '',
            loginCodeError: '',
            level: 1
        };
    }

    static getInitialProps(ctx) {
        initialize(ctx);
    }

    handleSendCode(e) {
        e.preventDefault();
        if (this.state.mobile.length === 11) {
            return this.sendCode();
        } else {
            this.setState({mobileError: 'شماره موبایل صحیح نمیباشد'})
        }

    }

    sendCode() {
        axios.post(`${process.env.BaseUrl}/api/site/login/sendCode`, {
            mobile: this.state.mobile
        })
            .then(response => {
                console.log(response);
                if (response.data.status === 1) {
                    this.setState({level: 2})
                }
            })
    }


    handleCheckCode(e) {
        e.preventDefault();
        if (this.state.loginCode.length === 5) {

            axios.post(`${process.env.BaseUrl}/api/site/login/checkCode`,
                {mobile: this.state.mobile, loginCode: this.state.loginCode})
                .then((response) => {
                    if (response.data.status === 1) {
                        this.props.authenticate2(response.data.api_token);
                    } else {
                        let status = response.data.status;
                        if (status === -3) {
                            this.setState({loginCodeError: 'کد وارد شده صحیح نیست'})
                        } else {
                            this.setState({loginCodeError: 'مشکلی به وجود آمد دوباره تلاش کنید'})
                        }
                    }
                })
                .catch((err) => {
                    throw new Error(err);
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

    mobileBox() {

        return (
            <div className='input-group'>
                <div className="input-group mb-3 mt-2">
                    <div className="input-group-prepend">
                                                <span className="input-group-text"><i
                                                    className="fas fa-mail-bulk color-orange"/></span>
                    </div>
                    <input
                        required
                        value={this.state.mobile}
                        onChange={e => this.setState({mobile: e.target.value})}
                        type="text" className="form-control  font-md"
                        placeholder="شماره موبایل"/>
                    <Col xs={12}>
                        <label className='f6 danger'>{this.state.mobileError}</label>
                    </Col>
                </div>
                <Row className="input-group " xs={12}>

                    <Col xs={7}>
                        <button onClick={this.handleSendCode.bind(this)}
                                className="btn btn-warning mt-3 mb-2 f6">
                            ارسال کد
                        </button>
                    </Col>

                    <Col xs={5}>
                        <Link href={`/register`}>
                            <a className="mt-3 mb-2 f6 mx-3 " style={{float: 'left'}}>تا حالا عضو
                                نشده
                                اید؟
                            </a>
                        </Link>
                    </Col>
                </Row>
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
                            <button onClick={this.handleCheckCode.bind(this)}
                                    className="btn btn-warning mt-3 mb-2 f6">ورود
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
                <div className={`container-fluid pb-5 pt-5 px-lg-4 px-md-4 ${reboot.rtl}`}
                     style={{backgroundColor: '#fafafa'}}>
                    <div className="row py-4 justify-content-center">
                        <div className="col-11 col-md-4 mt-2">
                            <div className="bg-white border" style={{height: '100%'}}>
                                <div className="frm pt-4 bg-white px-3 py-3 ">

                                    <h6 className="text-blue  color-red mb-3">ورود به ...</h6>

                                    {this.state.level === 1 ? this.mobileBox() : this.loginCodeBox()}


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