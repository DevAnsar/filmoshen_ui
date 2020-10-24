import React, {useEffect, useState} from 'react';
import reboot from './../style/reboot.module.css';
import initialize from "../utils/initialize";
import {connect} from 'react-redux';
import axios from 'axios';
import {useRouter} from 'next/router'
import ToastsAlert from "../components/ToastsAlert";

function PackageList({isAuthenticated}) {

    const router = useRouter();
    const [loading, SetLoading] = useState(true);
    const [subscribes, SetSubscribes] = useState([]);
    const [userStatus, SetUserStatus] = useState(-1);

    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('#fd3746');

    useEffect(() => {
        console.log('useEffect PackageList');

        async function getSubscribe(){
            await  axios.get(`/api/subscribe`)
                .then(response => {
                    console.log('/api/subscribe',response);
                    SetSubscribes(response.data.subscribe);
                    SetUserStatus(response.data.user_status);
                    SetLoading(false);
                })
                .catch(err => {
                    console.log(err)
                });
        }
       getSubscribe();

    }, []);

    // function handleSubscribeBuy(id){
    //     axios.get(`${process.env.BaseUrl}/api/site/subscribe/buy/${id}`)
    //         .then(response => {
    //             console.log(response);
    //             // SetSubscribes(response.data.subscribe);
    //             // SetLoading(false);
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         });
    // };

    const Loading = () => {
        return (
            <div className='row justify-content-center'>
                <div className='col-6 text-center'>
                    در حال دریافت...
                </div>
            </div>
        )
    };

    function paySubscribe(id) {

        if (userStatus === 1) {

            setAlertMessage('شما هنوز اشتراک فعال دارید.');
            setAlertColor('#35fd5a');
            setAlert(true);
            alertTimeOutHandle();

        } else if(userStatus === 0) {

            router.push(`/subscribe/${id}`);
        }else{
            setAlertMessage('ابتدا وارد شوید');
            setAlertColor('#35fd5a');
            setAlert(true);
            alertTimeOutHandle();
        }
    };

    let MessageTimeOut;

    function alertTimeOutHandle() {
        clearTimeout(MessageTimeOut);
        MessageTimeOut = setTimeout(() => {
            setAlert(false);
        }, 4000);
    }

    return (

        <>
            <ToastsAlert alert_show={alert} message={alertMessage} color={alertColor}/>
            <div className={`container-fluid py-5 px-lg-3 px-md-3 ${reboot.rtl}`} style={{backgroundColor: '#fbfbfd'}}>
                <div className={`container`} style={{minHeight: '450px'}}>

                    <h5 className="font-weight-bold">خرید اشتراک فیلموشن</h5>
                    {
                        loading ? <Loading/> : <>
                            <div className="row ">
                                {
                                    subscribes?.map(subscribe => {
                                        return (
                                            <div key={subscribe.id} className="col-12 col-md-6 col-lg-3 mt-4 h-100">
                                                <div className="card buy pb-4">
                                                    {
                                                        subscribe.discount === 0 ? '' :
                                                            <div className="off pt-1 text-white">
                                                                {subscribe.discount}
                                                                %
                                                            </div>
                                                    }

                                                    <div className="card-body">
                                                        <h6 className="mt-4 mb-3">
                                                            اشتراک
                                                            {' '}
                                                            {subscribe.monthCount}
                                                            {' '}
                                                            ماهه
                                                        </h6>
                                                        <p className="f10 success">
                                                            <i className='fas fa-check font-ms icon-check mr-1'/>
                                                            {subscribe.price * (1 - (subscribe.discount / 100))}
                                                            تومان
                                                        </p>

                                                        <p className="color-orange mt-3" style={{minHeight: '25px'}}>
                                                            {
                                                                subscribe.discount === 0 ? '' :
                                                                    <>
                                                                        قیمت اصلی:
                                                                        <span className="text-secondary mr-2 f6"
                                                                              style={{textDecoration: 'line-through'}}>
                                                    {subscribe.price}
                                                                            {' '}
                                                                            تومان

                                                    </span>
                                                                    </>

                                                            }
                                                        </p>


                                                        <div className="row justify-content-center mt-4 ">
                                                            <div className="col-12 col-md-11">
                                                                <input className="form-control border-dark mt-5 f7"
                                                                       placeholder="کد تخفیف را وارد کنید"/>
                                                                {/*<Link href={`/subscribe/${subscribe.id}`}>*/}
                                                                    {/*<a>*/}
                                                                        <button type="button" onClick={()=>paySubscribe(subscribe.id)}
                                                                                className="btn btn-red font-ms mt-3 w-100">انتخاب
                                                                        </button>
                                                                    {/*</a>*/}
                                                                {/*</Link>*/}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                    }

                </div>
            </div>
        </>
    )
}


PackageList.getInitialProps = async ctx => {
    initialize(ctx);
};
const mapStateToProps = (state) => (
    {
        isAuthenticated: !!state.authentication.token,
    }
);
export default connect(mapStateToProps)(PackageList);
