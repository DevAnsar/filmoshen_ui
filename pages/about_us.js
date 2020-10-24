import reboot from './../style/reboot.module.css';
import initialize from "../utils/initialize";
import {connect} from 'react-redux';
import axios from "axios/index";


function AboutUs({pageData}) {



    return (
        <>

            <div className={`container-fluid px-lg-5 px-md-5 py-5 ${reboot.rtl}`}>

                <h5 className="">درباره ما</h5>
                <div className="bg-white rounded pb-5" style={{height: '100%'}}
                     dangerouslySetInnerHTML={{__html: pageData}}/>

            </div>
        </>
    )
}

AboutUs.getInitialProps = async (ctx) =>{
    initialize(ctx);
    let page = '';
    await axios.get(`${process.env.BaseUrl}/api/v1/aboutPage`)
        .then(res => {
            page = res.data.data
        }).catch(err => console.log(err));

    return {
        pageData: page
    }

};

export default connect(state => state)(AboutUs);