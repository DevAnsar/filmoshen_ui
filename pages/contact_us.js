import React, {useState} from 'react';
import reboot from './../style/reboot.module.css';
import initialize from "../utils/initialize";
import {connect} from 'react-redux';
import axios from 'axios';
import ToastsAlert from "../components/ToastsAlert";

function ContactUs({pageData}) {

    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('#fd3746');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [message, setMessage] = useState('');

    let commentMessageTimeOut;
    const handleContactForm = () => {
        if (validator()) {

            axios.post(`${process.env.BaseUrl}/api/v1/setContact`, {
                name: name, email: email, tell: mobile, message: message
            }).then(res => {
                if (res.data.status) {
                    setName('');
                    setEmail('');
                    setMobile('');
                    setMessage('');

                    setAlertMessage('پیام شما با موفقیت ارسال شد');
                    setAlertColor('#35fd5a');
                    setAlert(true);
                    alertTimeOutHandle();
                }
                else {
                    setName('');
                    setEmail('');
                    setMobile('');
                    setMessage('');

                    setAlertMessage('متاسفانه پیام شما ارسال نشد');
                    setAlertColor('#fd3746');
                    setAlert(true);
                    alertTimeOutHandle();
                }

            }).catch(err => console.log('err', err))

        }else {

            setAlertMessage(' فیلدهای اجباری را وارد کنید');
            setAlertColor('#fd3746');
            setAlert(true);
            alertTimeOutHandle();

        }

    };

    function validator() {
        if (name.length !== 0) {
            if (email.length !== 0) {
                if (message.length !== 0) {
                    return true;
                }
            }
        }

        return false;
    }

    function alertTimeOutHandle() {
        clearTimeout(commentMessageTimeOut);
        commentMessageTimeOut =setTimeout(() => {
            setAlert(false);
        }, 4000);
    }

    return (
        <>
            <ToastsAlert alert_show={alert} message={alertMessage} color={alertColor}/>
            <div className={`container-fluid pb-5 pt-5 px-lg-4 px-md-4 ${reboot.rtl}`}
                 style={{backgroundColor: '#fafafa'}}>
                <div className={`container-fluid rounded bg-white  `}
                     style={{boxShadow: '0 1px 4px 0 rgba(0,0,0,.05)', border: '1px solid #f5f5f5'}}>
                    <div className="row bg-light">
                        <h5 className="py-3 px-3 mb-0">تماس با ما</h5>
                    </div>

                    <div className="row py-4 ">
                        <div className="col-12 col-md-6 mt-2">
                            <div className="bg-white rounded pb-5" style={{height: '100%'}}
                                 dangerouslySetInnerHTML={{__html: pageData}}/>
                        </div>

                        <div className="col-12 col-md-6 mt-2">
                            <div className="bg-white border" style={{height: '100%'}}>
                                <div className="frm pt-4 bg-white px-3 py-3 ">
                                    <h6 className="text-blue  color-red">فرم تماس</h6>

                                    <div className="input-group mb-3 mt-4">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i
                                                className="fa fa-user color-orange"/>
                                            </span>
                                        </div>
                                        <input type="text"
                                               className="form-control font-md"
                                               placeholder="نام و نام خانوادگی (اجباری)" value={name}
                                               onChange={(e) => setName(e.target.value)}/>
                                    </div>


                                    <div className="input-group mb-3 mt-2">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-mail-bulk color-orange"/>
                                        </span>
                                        </div>
                                        <input type="text" className="form-control  font-md" placeholder="ایمیل  (اجباری)"
                                               value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    </div>


                                    <div className="input-group mb-3 mt-2">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-phone color-orange"/>
                                        </span>
                                        </div>
                                        <input type="text" className="form-control font-md" placeholder="تلفن"
                                               value={mobile} onChange={(e) => setMobile(e.target.value)}/>
                                    </div>

                                    <div className="input-group mb-3 mt-2">
                                        <div className="input-group-prepend ">
                                        <span className="input-group-text">
                                            <i className="fa fa-edit color-orange "/>
                                        </span>
                                        </div>
                                        <textarea className="form-control font-md" rows="5"
                                                  placeholder="لطفا پیام خود را اینجا بنویسید  (اجباری)"
                                                  onChange={(e) => setMessage(e.target.value)} value={message}/>
                                    </div>

                                    <div className="form-group ">
                                        <button type="submit" onClick={() => handleContactForm()}
                                                className="btn btn-red mt-3 mb-2 f6">ارسال پیام
                                        </button>
                                    </div>

                                    {/*{*/}
                                    {/*alert ?*/}
                                    {/*<div className="form-group ">*/}
                                    {/*<div className='alert alert-success'>*/}
                                    {/*پیام شما با موفقییت ارسال شد.*/}
                                    {/*</div>*/}
                                    {/*</div>*/}
                                    {/*:*/}
                                    {/*<div/>*/}
                                    {/*}*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

ContactUs.getInitialProps = async ctx => {
    initialize(ctx);
    let page = '';
    await axios.get(`${process.env.BaseUrl}/api/v1/contactPage`)
        .then(res => {
            page = res.data.data
        }).catch(err => console.log(err));

    return {
        pageData: page
    }
};

export default connect(state => state)(ContactUs);