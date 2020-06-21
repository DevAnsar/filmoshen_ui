import React,{useState , useEffect} from 'react';
import {slide as Menu} from 'react-burger-menu'
import {connect} from 'react-redux';
import {withRouter} from "next/router";
import actions from "../redux/actions";
function SideMenu({open,setOpen,headerLinks,isAuthenticated,HeaderItem,router,deauthenticate}) {
    function showSettings(event) {
        event.preventDefault()

    }

   // const [isOpen,setIsOpen]=useState(false);

    // useEffect(()=>{
    //     console.log('clicked...');
    //     setOpen(!open);
    // },[open]);

    // useEffect(()=>{
    //     // setOpen(isOpen);
    // },[isOpen]);

    var styles = {
        bmBurgerButton: {
            position: 'fixed',
            width: '36px',
            height: '30px',
            right: '36px',
            top: '36px'
        },
        bmBurgerBars: {
            background: '#373a47'
        },
        bmBurgerBarsHover: {
            background: '#a90000'
        },
        bmCrossButton: {
            height: '24px',
            width: '24px'
        },
        bmCross: {
            background: '#bdc3c7'
        },
        bmMenuWrap: {
            position: 'fixed',
            height: '100%'
        },
        bmMenu: {
            background: '#373a47',
            padding: '2.5em 1.5em 0',
            fontSize: '1.15em'
        },
        bmMorphShape: {
            fill: '#373a47'
        },
        bmItemList: {
            color: '#b8b7ad',
            padding: '0.8em'
        },
        bmItem: {
            display: 'inline-block'
        },
        bmOverlay: {
            background: 'rgba(0, 0, 0, 0.3)'
        }
    };

    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
        <Menu right styles={styles} elastic isOpen={open} customBurgerIcon={false}>
            <ul>


                {
                    headerLinks.map((item, index) => {
                        if (!item.show) {
                            return (
                                <HeaderItem key_index={index} path={item.path}
                                            url_path={router.pathname} label={item.label}/>
                            )
                        } else if (item.show === 'logout') {
                            if (!isAuthenticated) {
                                return (
                                    <HeaderItem key_index={index} path={item.path}
                                                url_path={router.pathname} label={item.label}/>
                                )
                            }
                        } else if (item.show === 'login') {
                            if (isAuthenticated) {
                                return (
                                    <HeaderItem key_index={index} path={item.path}
                                                url_path={router.pathname} label={item.label}/>
                                )
                            }
                        }
                    })
                }
                {
                    isAuthenticated ? (
                        <li className="nav_item">
                            <a className={`nav-link  mr-1 `} onClick={deauthenticate}>
                                <p className="">خروج</p>
                            </a>
                        </li>
                    ) : ''
                }



            </ul>
            {/*<a id="home" className="menu-item" href="/">Home</a>*/}
            {/*<a id="about" className="menu-item" href="/about">About</a>*/}
            {/*<a id="contact" className="menu-item" href="/contact">Contact</a>*/}
            {/*<a onClick={showSettings} className="menu-item--small" href="">Settings</a>*/}
        </Menu>
    );

}
const mapStateToProps = (state) => (
    {isAuthenticated: !!state.authentication.token}
);
export default connect(mapStateToProps,actions)(withRouter(SideMenu));