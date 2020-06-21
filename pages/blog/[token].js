import React,{useEffect,useState} from 'react';
import axios from "axios/index";

import Light from './../../components/Light';
import rtl from './../../style/reboot.module.css';
// import sideBar from './sideBar';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';



function token({status, Post}) {

    const [latest, setLatest]=useState([]);
    const [most_visited, setMost_visited]=useState([]);

    useEffect(()=>{
        axios.get(`${process.env.BaseUrl}/api/v1/blog/sidebar`)
            .then(res=>{
                console.log('sideBar data',res);
                setLatest(res.data.latest);
                setMost_visited(res.data.most_visited);
            }).catch(err=>{

        })
    },[]);

    return (
        <>
            <Light status={status}>
                <div className={`container-fluid px-lg-5 px-md-5 pt-4 pb-4 ${rtl.rtl} blog_post_page`}>

                    <div className="row  justify-content-between pt-4 mx-0">
                        <div className="col-12  col-lg-8 border bg-white rounded mt-2 pb-4 blog_post_page_body">
                            <p className="font-s pb-1 text-secondary">
                                <i className="fa fa-clock mt-2 mx-1 text-secondary"/>شنبه 27 مهر
                            </p>
                            {
                                Post.cover ?
                                    <img src={`${process.env.BaseUrl}${Post.cover}`} className="img-fluid"/>
                                    :
                                    <></>
                            }


                            <h5 className="font-weight-bold mt-3">
                                {Post.title}
                            </h5>

                            <div dangerouslySetInnerHTML={{__html: Post.body}}/>
                        </div>
                        <div className="col-12 col-lg-4 rounded pl-lg-0 bor-weblog mt-2" style={{height: '100%'}}>
                            {/*<sideBar />*/}
                            <div className="container border bg-white rounded pt-2 pb-5" style={{minHeight:'600px'}}>
                            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">

                                <Tab eventKey="profile" title="پربازدیدترین ها">

                                    <>

                                        <div className="row">
                                            <div className="col-12 col-md-12" >
                                                {
                                                    most_visited?.map(item=>{
                                                        return(
                                                            <div key={item.token} className="row pt-4">
                                                                <div className="col-7">
                                                                    <a href="#">
                                                                        <p className="text-justify text-dark"
                                                                           style={{lineHeight: '1.5'}}>
                                                                            {
                                                                                item.title
                                                                            }
                                                                        </p>
                                                                    </a>
                                                                    <p className="font text-secondary font-ss pt-1">
                                                                        <i className="fa fa-clock mx-1 text-secondary"/>
                                                                        >شنبه 27 مهر
                                                                    </p>
                                                                </div>
                                                                <div className="col-5">
                                                                    <a href="#">
                                                                        <img src={`${process.env.BaseUrl}${item.cover}`}
                                                                             className="img-weblog img-fluid d-block mx-auto"/>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }

                                                {/*//*/}
                                            </div>
                                        </div>

                                    </>
                                </Tab>
                                <Tab eventKey="contact" title="تازه ها">

                                    <>

                                        <div className="row">
                                            <div className="col-12 col-md-12">
                                                {
                                                    latest?.map(item=>{
                                                        return(
                                                            <div key={item.token} className="row pt-4">
                                                                <div className="col-7">
                                                                    <a href="#">
                                                                        <p className="text-justify text-dark"
                                                                           style={{lineHeight: '1.5'}}>
                                                                            {
                                                                                item.title
                                                                            }
                                                                        </p>
                                                                    </a>
                                                                    <p className="font text-secondary font-ss pt-1">
                                                                        <i className="fa fa-clock mx-1 text-secondary"/>
                                                                        >شنبه 27 مهر
                                                                    </p>
                                                                </div>
                                                                <div className="col-5">
                                                                    <a href="#">
                                                                        <img src={`${process.env.BaseUrl}${item.cover}`}
                                                                             className="img-weblog img-fluid d-block mx-auto"/>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }

                                                {/*//*/}
                                            </div>
                                        </div>

                                    </>
                                </Tab>
                            </Tabs>

                            </div>
                        </div>

                    </div>
                </div>
            </Light>
        </>
    )
}

token.getInitialProps = async (ctx) => {
    // initialize(ctx);
    let {query} = ctx;
    let post = '';
    let status = false;

    let api = `${process.env.BaseUrl}/api/v1/post/${query.token}`;


    await axios.get(api).then(response => {

        status = response.data.status;
        if (status) {
            post = response.data.post
        }


    }).catch(error => console.log(error));

    return {
        status: status,
        Post: post,
    }
};
export default token;