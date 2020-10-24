import React, {useState} from 'react';
import Layout from "../Layout";
import {Col, Form} from 'react-bootstrap'
import axios from 'axios';
import ToastsAlert from "../../ToastsAlert";
import {Spinner} from 'react-bootstrap';

function ProfileEdit({user}) {

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('#fd3746');

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    // useEffect(()=>{
    //     setName(user.name);
    //     setEmail(user.email);
    // },[]);


    function handleProfileEdit(e) {
        setLoading(true);
        e.preventDefault();
        // console.log('name',name)
        axios.get(`/api/profile/edit?name=${name}&email=${email}`)
            .then(res => {

                let {status} = res.data;
                if (status === 1) {
                    setAlertMessage('اطلاعات پروفایل یا موفقیت ویرایش شد');
                    setAlertColor('#35fd5a');
                    setAlert(true);
                    alertTimeOutHandle();
                    setLoading(false);
                } else if (status === -2) {
                    setAlertMessage('ایمیل قبلا ثبت شده است');
                    setAlertColor('#fd3746');
                    setAlert(true);
                    alertTimeOutHandle();
                    setLoading(false);
                } else {
                    setAlertMessage(`مشکلی بوجود آمد.کمی بعد دوباره تلاش کنید.${status}`);
                    setAlertColor('#fd3746');
                    setAlert(true);
                    alertTimeOutHandle();
                    setLoading(false);
                }
            }).catch(err => console.log(err))
    };


    let commentMessageTimeOut;

    function alertTimeOutHandle() {
        clearTimeout(commentMessageTimeOut);
        commentMessageTimeOut = setTimeout(() => {
            setAlert(false);
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
                                نام کامل
                            </Form.Label>
                            <Form.Control
                                onChange={e => setName(e.target.value)}
                                placeholder="نام کامل" value={name}/>
                        </Col>
                        <Col xs={12} md={6} lg={3}>
                            <Form.Label>
                                ایمیل
                            </Form.Label>
                            <Form.Control
                                onChange={e => setEmail(e.target.value)}
                                placeholder="ایمیل" value={email}/>
                        </Col>
                        <Col xs={12} md={12} lg={12} className={`mt-4`}>
                            <button disabled={loading} onClick={handleProfileEdit.bind(this)} className={`btn btn-warning text-white f8`}>
                                <span className="pl-2">ویرایش</span>
                                {
                                    loading ? <Spinner
                                        className="mb-1"
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    /> :''
                                }

                            </button>
                        </Col>
                    </Form.Row>
                </Form>
            </Col>

        </Layout>
    )
}

ProfileEdit.getInitialProps = ctx => {

    return {}
};


export default (ProfileEdit);