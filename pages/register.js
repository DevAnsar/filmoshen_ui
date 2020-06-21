import {useRef} from 'react';
import axios from 'axios';
import reboot from './../style/reboot.module.css';
import Link from 'next/link'

export  default function register() {
    const nameRef=useRef(null);
    const emailRef=useRef(null);
    const passRef=useRef(null);
    function handleRegisterForm() {
        axios.post(`${process.env.BaseUrl}/api/site/register`,{
            'name':nameRef.current.value,
            'email':emailRef.current.value,
            'password':passRef.current.value
        }).then(response=>{
            console.log(response)
        }).catch(error=>{
            console.log(error)
        });
    }
    return(
        <div className={`container-fluid pb-5 pt-5 px-lg-4 px-md-4 ${reboot.rtl}`} style={{backgroundColor: '#fafafa'}}>
            <div className="row py-4 justify-content-center">
                <div className="col-11 col-md-4 mt-2">
                    <div className="bg-white border" style={{height: '100%'}}>
                        <div className="frm pt-4 bg-white px-3 py-3 ">

                            <h6 className="text-blue  color-red mb-3">ثبت نام در ...</h6>

                            <div className="input-group mb-3 mt-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i
                                        className="fas fa-mail-bulk color-orange"/></span>
                                </div>
                                <input ref={nameRef} type="text" className="form-control  font-md" placeholder="نام کامل"/>
                            </div>

                            <div className="input-group mb-3 mt-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i
                                        className="fas fa-mail-bulk color-orange"/></span>
                                </div>
                                <input ref={emailRef} type="email" className="form-control  font-md" placeholder="ایمیل"/>
                            </div>


                            <div className="input-group mb-3 mt-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-phone color-orange"/></span>
                                </div>
                                <input ref={passRef} type="text" className="form-control font-md" placeholder="رمز عبور"/>
                            </div>


                            <div className="form-group ">
                                <button onClick={handleRegisterForm} className="btn btn-warning mt-3 mb-2 f6">ثبت نام</button>

                                <Link href={`/login`}>
                                    <a className="mt-3 mb-2 f6 mx-3 " style={{float :'left'}}>قبلا عضو شدید؟</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}