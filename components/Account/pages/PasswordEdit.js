import React, {useState} from 'react';
import Layout from "../Layout";
import {Col, Form} from 'react-bootstrap'
import axios from 'axios';
import ToastsAlert from "../../ToastsAlert";
import Router from 'next/router';
import {Spinner} from 'react-bootstrap';
function PasswordEdit({user}) {

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('#fd3746');

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    function handlePasswordEdit(e) {
        setLoading(true);
        e.preventDefault();
        if (password.length !== 0) {
            if (password.length >= 8) {
                if (password === passwordConfirm) {
                    axios.get(`/api/profile/password/edit?password=${password}`)
                        .then(res => {

                            let {status} = res.data;
                            if (status === 1) {
                                setAlertMessage('رمز عبور با موفقیت ویرایش شد');
                                setAlertColor('#35fd5a');
                                setAlert(true);
                                setLoading(false);
                                alertTimeOutHandle('/');
                            } else if (status === -1 || status === -2) {

                                setAlertMessage(`مشکلی بوجود آمد.کمی بعد دوباره تلاش کنید.${status}`);
                                setAlertColor('#fd3746');
                                setAlert(true);
                                alertTimeOutHandle();

                                setLoading(false);
                            }

                        }).catch(err => console.log(err))

                } else {
                    setAlertMessage('رمز انتخابی با تکرار آن یکسان نیست');
                    setAlertColor('#fd3746');
                    setAlert(true);
                    alertTimeOutHandle();
                    setLoading(false);
                    setLoading(false);
                }
            }
            else {
                setAlertMessage('رمز انتخابی باید بیشتر از 8 کاراکتر باشد');
                setAlertColor('#fd3746');
                setAlert(true);
                alertTimeOutHandle();
                setLoading(false);
            }
        } else {

            setAlertMessage('رمز نمیتواند مقداری خالی داشته باشد');
            setAlertColor('#fd3746');
            setAlert(true);
            alertTimeOutHandle();
            setLoading(false);
        }
    }


    let messageTimeOut;

    function alertTimeOutHandle(redirect = '') {
        clearTimeout(messageTimeOut);
        messageTimeOut = setTimeout(() => {
            setAlert(false);
            if (redirect !== '') {
                Router.push(redirect);
            }
        }, 4000);
    }

    return (
        <Layout user={user}>
            <ToastsAlert alert_show={alert} message={alertMessage} color={alertColor}/>
            <Col sm={12}>
                <Form>
                    <Form.Row>
                        <Col xs={12} md={6} lg={3}>
                            <Form.Label>
                                رمز جدید
                            </Form.Label>
                            <Form.Control
                                onChange={e => setPassword(e.target.value)}
                                type='password'
                            />
                        </Col>

                        <Col xs={12} md={6} lg={3}>
                            <Form.Label>
                                تکرار رمز جدید
                            </Form.Label>
                            <Form.Control
                                onChange={e => setPasswordConfirm(e.target.value)}
                                type='password'/>
                        </Col>
                        <Col xs={12} md={12} lg={12} className={`mt-4`}>
                            <button disabled={loading} onClick={handlePasswordEdit.bind(this)}
                                    className={`btn btn-warning text-white f8`}>


                                <span className="pl-2"> تغییر رمز</span>
                                {
                                    loading ? <Spinner
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
                    </Form.Row>
                </Form>
            </Col>

        </Layout>
    )
}

PasswordEdit.getInitialProps = ctx => {

    return {}
};


export default PasswordEdit;