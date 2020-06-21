import React, {useState} from 'react';
import Router ,{withRouter , useRouter } from "next/router";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Link from 'next/link';

import reboot from '../style/reboot.module.css';

import {connect} from 'react-redux';
import actions from '../redux/actions';
import SideMenu from './SideMenu';
export const initialFooter = {
    name: 'ansar',
    family: 'mirzayi',
};

const headerLinks = [
    {
        label: "صفحه اصلی",
        path: "/",

    },
    {
        label: "خرید اشتراک",
        path: "/packagelist",
    },
    {
        label: "ورود",
        path: "/login",
        show: 'logout'
    },
    {
        label: "اکانت",
        path: "/account",
        show: 'login'
    },
    {
        label: "تماس با ما",
        path: "/contact_us",

    },
    {
        label: "درباره ی ما",
        path: "/about_us",

    },
    {
        label: "بلاگ",
        path: "/blog",

    }
];

const HeaderItem = ({key_index, path, url_path, label}) => {

    return (
        <li key={key_index} className="nav_item">
            <Link href={path}>
                <a className={`nav-link  mr-1 ${url_path === path ? "active" : ""}`}>
                    <p className="">{label}</p>
                </a>
            </Link>
        </li>
    )
};


function Header({router, app_logo, isAuthenticated, deauthenticate}){

    const [searchBox, setSearchBox] = useState(false);
    const [menu, setMenu] = useState(false);

    const SearchResMovieItem=({movie})=>{

        // const router = useRouter();
        const handleClick = (e) => {

            console.log('click...');
            setSearchBox(false);
            Router.push(`/movie/[token]`, `/movie/${movie.token}`)
        };

        return(
            <li className="search-result-item" onClick={() => handleClick()}>
                {/*<Link href={`/movie/[token]`} as={`/movie/${movie.token}`}>*/}
                <a >
                    <div className="search-result-link">
                        <div className="right-side">
                            <span className="header-v4-ratio"/>
                            <img
                                src={`${process.env.BaseUrl}${movie.cover}`}
                                className="search-result-image" alt={movie.title}/>
                            <span className="hover-play">
                                                        <span
                                                            className="svg-icon-wrapper is-icon-playbluevod  playbluevod">
                                                            <svg
                                                                version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                                style={{}}
                                                                viewBox="0 0 32 32">
                                                                <path
                                                                    d="M5.177 1.404c-2.903 2.903-2.903 26.125 0 29.027 2.903 2.903 25.157-10.643 25.157-14.513 0-3.87-22.254-17.416-25.157-14.514z"/>
                                                            </svg>
                                                        </span>
                                                    </span>
                        </div>

                        <div className="left-side">
                            <h2 className="movie-title">
                                {
                                    movie.title
                                }
                            </h2>
                            <div className="search-subtitle title-en">
                                {
                                    movie.main_title
                                }
                            </div>
                            <div className="movie-details">
                                {
                                    movie.genre
                                }
                            </div>
                            <div className="movie-details director"/>
                            <div className="movie-description">
                                {
                                    movie.story
                                }
                            </div>
                            <div className="movie-info">
                                                        <span className="play-icon-holder">
                                                            <span
                                                                className="svg-icon-wrapper is-icon-playbluevod  playbluevod">
                                                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                                     style={{}}
                                                                     viewBox="0 0 32 32">

                                                                    <path d="M5.177 1.404c-2.903 2.903-2.903 26.125 0 29.027 2.903 2.903 25.157-10.643 25.157-14.513 0-3.87-22.254-17.416-25.157-14.514z" />
                                                                </svg>
                                                            </span>
                                                        </span>
                                <span className="play-text-holder">
                                                            تماشا فیلم
                                                        </span>
                            </div>
                            <div className="movie-rating">
                                                        <span className="rating-icon-holder">
                                                            <span className="svg-icon-wrapper is-icon-thumbs_up ">
                                                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                                     style={{}} viewBox="0 0 25 25">

                                                                </svg>
                                                            </span>
                                                        </span>
                                <span
                                    className="rating-text-holder">98%</span>
                            </div>
                        </div>
                    </div>
                </a>
                {/*</Link>*/}
            </li>
        )
    };
    let searchTimeOut;
    function SearchBox(){

        const [search, setSearch] = useState();
        const [movies, setMovies] = useState([]);
        const [crews, setCrews] = useState([]);



        function handleSearch(q) {

            setSearch(q);
            clearTimeout(searchTimeOut);
            searchTimeOut = setTimeout(() => {
                getSearch(search);
            }, 1500);
            console.log('search', search)
        }

        async function getSearch() {

            if (search !== '') {
                console.log('get search', search);
                await  axios.get(`${process.env.BaseUrl}/api/v1/search?q=${search}`).then(res => {
                    console.log('res', res);
                    setMovies(res.data.res.movies);
                    setCrews(res.data.res.crews);
                }).catch(err => console.log(err))
            }
        }

        return (
            <div className={`searchBox ${searchBox ? 'active' : ''}`}>
                <div className="row search-suggest-gradient" />
                <div className='container pt-5'>

                    <div className='row pt-5 justify-content-center'>
                        <div className='col-9'>

                            <div className='row searchForm'>
                                <div className='col-10 pl-0 search-suggest-form'  style={{zIndex:'10'}} >
                                    <input
                                        placeholder='جستجوی فیلم،بازیگر،کارگردان و ...'
                                        type='text'
                                        className='form-control pr-5 py-4'
                                        value={search}
                                        onChange={(e) =>handleSearch(e.target.value)}
                                    />

                                </div>
                                <div className='col-2'  style={{zIndex:'10'}} >
                                     <span className='btn btn-warning py-2'
                                           onClick={() => setSearchBox(false)}
                                     >
                                          بستن
                                    </span>
                                </div>
                            </div>

                            <div className='row searchRes'>

                                <ul className="header-v4-search-result-wrapper">
                                    {
                                        movies?.map(movie=>{
                                            return <SearchResMovieItem key={movie.token} movie={movie} />
                                        })
                                    }

                                </ul>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <Container fluid className={`f7 px-lg-4 px-md-4 border-top ${reboot.rtl} bg-dark`}>
            <SideMenu pageWrapId={ "page-wrap" } open={menu} setOpen={setMenu} headerLinks={headerLinks} HeaderItem={HeaderItem} />
            <SearchBox/>
            <Row>
                <div className="col-5 col-md-9">
                    <nav className="navbar navbar-expand-md navbar-dark d-none d-xl-block">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mynavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse pt-xl-3 pt-4" id="mynavbar">
                            <ul className="navbar-nav">

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

                                <li className="nav_item mx-3">
                                    <a className={`nav-link  mr-1 `} onClick={(e) => {
                                        console.log('search...');
                                        e.preventDefault();
                                        setSearchBox(prevState => {
                                            return !prevState;
                                        })
                                    }}>
                                        <p className="">جستجو</p>
                                    </a>


                                </li>


                            </ul>
                        </div>
                    </nav>
                    <a  className=" rounded mx-md-4 d-xl-none" onClick={()=>setMenu(prev=>!prev)}>
                        <img src="/img/open_menu.png" className="mt-4 pt-lg-3 mt-md-3 pt-md-1"/>
                    </a>
                </div>

                <div className="col-7 col-md-3 ">
                    <img src={`${process.env.BaseUrl}${app_logo}`} className="img-fluid mt-2 d-block mr-auto mb-2"
                         style={{width: '110px', height: '70px'}}/>
                </div>
            </Row>
        </Container>
    )
};

const mapStateToProps = (state) => (
    {isAuthenticated: !!state.authentication.token}
);

export default connect(mapStateToProps, actions)(withRouter(Header));