import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import useWindowSize from './../hooks/useWindowSize';

const Master = ({children}) => {
    const size = useWindowSize();
    const [app_start, setAppStart] = useState(true);
    const [app_name, setAppName] = useState(null);
    const [app_logo, setAppLogo] = useState(null);
    const [app_footer_logo, setAppFooterLogo] = useState(null);
    const [app_footer_description, setAppFooterDescription] = useState(null);
    const [socials, setSocials] = useState(null);
    const [mobile_apps, setMobile_apps] = useState(null);

    useEffect(() => {
        console.log('Master reloaded');
        axios.get(`${process.env.BaseUrl}/api/site/data`).then(response => {
            // console.log(response);
            let constData = response.data;
            setAppName(constData.app_name);
            setAppLogo(constData.app_logo);
            setAppFooterLogo(constData.app_footer_logo);
            setAppFooterDescription(constData.app_footer_description);
            setSocials(constData.socials);
            setMobile_apps(constData.apps);

            appStart();
        }).catch(error => console.log(error));
    }, []);

    function appStart() {
        setTimeout(() => {
            setAppStart(false);
        }, 1500)
    }

    const mainThem = () => {


        return (
            <>

                <div id="page-wrap">
                    {/*{console.log('master login check:',isAuthenticated)}*/}
                    <Header
                        site_name={app_name}
                        app_logo={app_logo}
                    />

                    {children}

                    <Footer
                        site_name={app_name}
                        footer_logo={app_footer_logo}
                        footer_description={app_footer_description}
                        socials={socials}
                        mobile_apps={mobile_apps}
                    />
                </div>
            </>
        )
    };
    const Loading = () => {


        return (
            <div className='container-fluid p-0' style={{width: size.width, height: size.height, textAlign: 'center'}}>
                <div style={{marginTop: 300, display: 'inline-block'}}>Loading</div>
            </div>
        )
    };

    return (
        <>
            {
                app_start ? Loading() : mainThem()
            }
        </>
    )
};

// const mapStateToProps = (state) => (
//     {isAuthenticated: !!state.authentication.token}
// );
//
// export default connect(mapStateToProps, actions)(Master);
export default Master;