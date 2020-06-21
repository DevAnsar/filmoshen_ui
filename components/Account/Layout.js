import React from 'react';
import Head from "next/head";
import NavBar from "./NavBar";
import navButtons from "./buttons";
import reboot from './../../style/reboot.module.css';

const Layout = ({children, user}) => {
    return (
        <>
            <div className={`container-fluid px-lg-5 px-md-5 my-5 ${reboot.rtl}`}>

                <div className="row mt-2">
                    <Head>
                        <title>اکانت کاربری</title>
                        <meta charSet="utf-8"/>
                    </Head>

                    <div className="col-12 col-md-4 col-lg-3 col-xl-2 bg-white py-3 mt-2 "
                         style={{boxShadow: '0 1px 4px 0 rgba(0,0,0,.05)', border: '1px solid #f5f5f5'}}>
                        <NavBar navButtons={navButtons} user={user}/>
                    </div>

                    <div className="col-12 col-md-8 col-lg-9 col-xl-10 mt-2">
                        <div className=" py-4 tabcontent">
                            <div className="row">
                                {children}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Layout;