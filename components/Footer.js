import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import reboot from '../style/reboot.module.css';
import Link from 'next/link';

export const initialFooter = {
    name: 'ansar',
    family: 'mirzayi',
};

const Footer = ({site_name, footer_logo, footer_description, socials, mobile_apps}) => {


    // const [footer, setFooter] = useState(initialFooter);
    // useEffect(() => {
    //
    // },[]);

    return (
        <Container fluid className={` py-3  border-top ${reboot.rtl}`} style={{backgroundColor: '#f1f1f1'}}>


            <Row>
                <div className="col-12 col-md-8 mt-2">
                    <Link href={`/`}>
                        <a>
                            <img src={`${process.env.BaseUrl}${footer_logo}`} className="img-fluid d-block "
                                 style={{width: '100px'}}/>
                        </a>
                    </Link>

                    <div className="pt-3 pl-md-3 pl-lg-3 text-justify text-dark"
                         dangerouslySetInnerHTML={{__html: footer_description}}/>
                </div>
                <div className="col-12 col-md-4 mt-3" style={{textAlign: 'center'}}>
                    <h6 className="mb-0">
                        <i className='fas fa-mobile-alt mr-1' style={{fontSize: '16px'}}/>
                        {`اپلیکیشن های `}
                        {site_name}
                        :
                    </h6>
                    {
                        mobile_apps?.map(app => {
                            return (
                                <a href={app.link}>
                                    <img title={app.title} key={app.id} src={`${process.env.BaseUrl}${app.icon}`}
                                         className="img-fluid mt-3 p-1"/>
                                </a>
                            )
                        })
                    }


                </div>
            </Row>


            {/*<Row className=" justify-content-center mt-1 mt-md-5 mt-lg-5">*/}
            {/*<nav className="navbar navbar-expand-sm d-none d-sm-block">*/}

            {/*<ul className="navbar-nav">*/}
            {/*<li className="nav-item">*/}
            {/*<a className="nav-link text-dark" href="#">درباره ما</a>*/}
            {/*</li>*/}
            {/*<li className="nav-item">*/}
            {/*<a className="nav-link text-dark" href="#">تماس با ما</a>*/}
            {/*</li>*/}
            {/*<li className="nav-item">*/}
            {/*<a className="nav-link text-dark" href="#">فیلم ها</a>*/}
            {/*</li>*/}
            {/*<li className="nav-item">*/}
            {/*<a className="nav-link text-dark" href="#">خرید اشتراک</a>*/}
            {/*</li>*/}
            {/*</ul>*/}

            {/*</nav>*/}
            {/*</Row>*/}
            <Row className="justify-content-center">
                <div className="col-12 col-md-10">
                    <div className="progress mt-md-2 mt-lg-2 mt-3" style={{height: '1px', backgroundColor: '#d3d3d3'}}>
                        <div className="progress-bar"/>
                    </div>
                </div>
            </Row>
            <Row className="justify-content-center mt-3 ">
                {
                    socials?.map(social => {
                        return (
                            <div className='  fab-icon'>
                                <a href={social.link} target='_blank'>
                                    <img title={social.title} style={{maxWidth: '100%'}}
                                         src={`${process.env.BaseUrl}${social.icon}`}/>
                                </a>
                            </div>
                        )
                    })
                }
            </Row>
        </Container>
    )
};

export default Footer;