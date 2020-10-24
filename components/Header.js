import React, {useState} from 'react';
import Router, {useRouter, withRouter} from "next/router";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import reboot from '../style/reboot.module.css';

import {connect} from 'react-redux';
import actions from '../redux/actions';
import SideMenu from './SideMenu';
import Link from 'next/link';
import Menu, {Item as MenuItem, SubMenu} from 'rc-menu';

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
        label: "خرید اشتراک",
        path: "/packagelist",
    },
    {
        label: "دسته بندی فیلم",
        type: "movie_cat",

    },
    {
        label: "دسته بندی موزیک",
        type: "music_cat",

    },
    {
        label: "بلاگ",
        path: "/blog",

    },

    {
        label: "درباره ما",
        path: "/about_us",

    },
    {
        label: "تماس با ما",
        path: "/contact_us",

    }
];

export const HeaderItem = ({key_index, path, url_path, label, close}) => {

    const router = useRouter();

    function handleClick(path) {
        close(true);
        router.push(path);
    }

    return (
        <li key={key_index} className="nav_item mt-3 mt-md-0">

            <a onClick={() => handleClick(path)} className={`nav-link  mr-1 ${url_path === path ? "active" : ""}`}>
                <p className="">{label}</p>
            </a>

        </li>
    )
};


function Header({router, app_logo, isAuthenticated, deauthenticate, categories}) {

    const [searchBox, setSearchBox] = useState(false);
    const [menu, setMenu] = useState(false);
    const [movies, setMovies] = useState(categories['movies']);
    const [musics, setMusics] = useState(categories['musics']);

    const SearchResMovieItem = ({movie}) => {

        // const router = useRouter();
        const handleClick = (e) => {

            console.log('click...');
            setSearchBox(false);
            Router.push(`/movie/[token]`, `/movie/${movie.token}`)
        };

        return (
            <li className="search-result-item" onClick={() => handleClick()}>
                {/*<Link href={`/movie/[token]`} as={`/movie/${movie.token}`}>*/}
                <a>
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
                            <div className="movie-description d-none d-md-block">
                                {
                                    movie.story
                                }
                            </div>
                            <div className="movie-info d-none d-md-block">
                                                        <span className="play-icon-holder">
                                                            <span
                                                                className="svg-icon-wrapper is-icon-playbluevod  playbluevod">
                                                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                                     style={{}}
                                                                     viewBox="0 0 32 32">

                                                                    <path
                                                                        d="M5.177 1.404c-2.903 2.903-2.903 26.125 0 29.027 2.903 2.903 25.157-10.643 25.157-14.513 0-3.87-22.254-17.416-25.157-14.514z"/>
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
                                {/*<span*/}
                                {/*className="rating-text-holder">98%</span>*/}
                            </div>
                        </div>
                    </div>
                </a>
                {/*</Link>*/}
            </li>
        )
    };

    const SearchResMusicItem = ({music}) => {

        // const router = useRouter();
        const handleClick = (e) => {

            console.log('click...');
            setSearchBox(false);
            Router.push(`/music/[token]`, `/music/${music.token}`)
        };

        return (
            <li className="search-result-item" onClick={() => handleClick()}>
                {/*<Link href={`/movie/[token]`} as={`/movie/${movie.token}`}>*/}
                <a>
                    <div className="search-result-link">
                        <div className="right-side">
                            <span className="header-v4-ratio"/>
                            <img
                                src={`${process.env.BaseUrl}${music.cover}`}
                                className="search-result-image" alt={music.title}/>
                        </div>

                        <div className="left-side">
                            <h2 className="movie-title">
                                {
                                    music.title
                                }
                            </h2>
                            <div className="search-subtitle title-en">
                                {
                                    music.main_title
                                }
                            </div>

                            <div className="movie-details director"/>
                        </div>
                    </div>
                </a>

            </li>
        )
    };

    const SearchCrewItem = ({crew}) => {

        // const router = useRouter();
        const handleClick = (e) => {

            console.log('click...');
            setSearchBox(false);
            Router.push(`/crew/[slug]`, `/crew/${crew.slug}`)
        };

        return (
            <li key={crew.slug} className="search-result-item" onClick={() => handleClick()}>
                {/*<Link href={`/movie/[token]`} as={`/movie/${movie.token}`}>*/}
                <a>
                    <div className="search-result-link">
                        <div className="right-side">
                            <span className="header-v4-ratio"/>
                            <img
                                src={`${crew.avatar ? process.env.BaseUrl + crew.avatar : '/img/null_user.png'}`}
                                className="search-result-image" alt={crew.name}/>
                        </div>

                        <div className="left-side">
                            <h2 className="movie-title">
                                {
                                    crew.name
                                }
                            </h2>
                            <div className="search-subtitle title-en">
                                {
                                    crew.main_name
                                }
                            </div>

                            <div className="movie-details director"/>
                        </div>
                    </div>
                </a>

            </li>
        )
    };


    let searchTimeOut;

    function SearchBox() {

        const [search, setSearch] = useState();
        const [movies, setMovies] = useState([]);
        const [musics, setMusics] = useState([]);
        const [crews, setCrews] = useState([]);


        function handleSearch(q) {

            setSearch(q);
            console.log('search', search);
            console.log('q', q);
            clearTimeout(searchTimeOut);
            searchTimeOut = setTimeout(() => {
                getSearch(q);
            }, 1500);

        }

        async function getSearch() {

            if (search !== '') {
                console.log('get search', search);
                await  axios.get(`${process.env.BaseUrl}/api/v1/search?q=${search}`).then(res => {
                    console.log('res', res);
                    setMovies(res.data.res.movies);
                    setMusics(res.data.res.musics);
                    setCrews(res.data.res.crews);
                }).catch(err => console.log(err))
            }
        }

        return (
            <div className={`searchBox ${searchBox ? 'active' : ''}`}>
                <div className="row search-suggest-gradient"/>
                <div className='container pt-3 pt-md-5'>

                    <div className='row pt-5 justify-content-center'>
                        <div className='col-12 col-md-9'>

                            <div className='row searchForm'>
                                <div className='col-8 col-md-10 pl-0 search-suggest-form' style={{zIndex: '10'}}>
                                    <input
                                        placeholder='جستجوی فیلم،بازیگر،کارگردان و ...'
                                        type='text'
                                        className='form-control pr-5 py-4'
                                        value={search}
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />

                                </div>
                                <div className='col-4 col-md-2' style={{zIndex: '10'}}>
                                     <span className='btn btn-warning py-2'
                                           onClick={() => setSearchBox(false)}
                                     >
                                          بستن
                                    </span>
                                </div>
                            </div>

                            <div className='row searchRes'>

                                <ul className="header-v4-search-result-wrapper" style={{minWidth: '100%'}}>
                                    {
                                        movies?.map(movie => {
                                            return <SearchResMovieItem key={movie.token} movie={movie}/>
                                        })
                                    }
                                    {
                                        musics?.map(music => {
                                            return <SearchResMusicItem key={music.token} music={music}/>
                                        })
                                    }
                                    {
                                        crews?.map(crew => {
                                            return <SearchCrewItem key={crew.slug} crew={crew}/>
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

    function closeMenu() {
        setMenu(false);
    }

    function openSearch() {
        setSearchBox(true);
    }
    const getSvgIcon = (style) => {
        return (
            <img style={style} src={`/img/return.png`} />
        );
    };

    function itemIcon() {
        return getSvgIcon({
            position: 'absolute',left: '15px'
        });
    }
    function expandIcon(props) {
        return getSvgIcon({
            position: 'absolute',left: '15px',transform: `rotate(${props.isOpen ? -90 : 0}deg)`,
        });
    }

    const movie_cat=(props)=>{

        return(
            <li className="nav_item mx-3">

                <Menu
                    {...props}
                    multiple

                >
                    <SubMenu title={<span className='text-white'>{props.title}</span>} key="music">

                        {
                            movies.map(movie=>{
                                if (movie.children.length>0){

                                    return(
                                        <SubMenu key={movie.token} title={

                                            <Link href={'/tag/[category]'} as={`/tag/${movie.slug}`}>
                                                <a>
                                                    <span className='text-secondary'>{movie.title}</span>
                                                </a>
                                            </Link>

                                        }>

                                            {
                                                movie?.children?.map(item=>{
                                                    return(
                                                        <MenuItem key={item.token}>

                                                            <Link href={'/tag/sub/[category]'} as={`/tag/sub/${item.slug}`}>
                                                                <a>
                                                                    <span className='text-secondary'>{item.title}</span>
                                                                </a>
                                                            </Link>

                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </SubMenu>
                                    )

                                } else {
                                    return(
                                        <MenuItem key={movie.token}>
                                            <Link href={'/tag/[category]'} as={`/tag/${movie.slug}`}>
                                                <a>
                                                    <span className='text-secondary'>{movie.title}</span>
                                                </a>
                                            </Link>
                                        </MenuItem>
                                    )
                                }
                            })
                        }


                    </SubMenu>
                </Menu>


            </li>
        )
    };

    const music_cat=(props)=>{

        return(
            <li className="nav_item mx-3">

                <Menu
                    multiple
                    {...props}
                >
                    <SubMenu title={<span className='text-white'>{props.title}</span>} key="music">
                        {
                            musics.map(music=>{
                                if (music.children.length>0){

                                    return(
                                        <SubMenu key={music.token} title={

                                            <Link href={'/tag/m/[category]'} as={`/tag/m/${music.slug}`}>
                                                <a>
                                                    <span className='text-secondary'>{music.title}</span>
                                                </a>
                                            </Link>

                                        }>

                                            {
                                                music?.children?.map(item=>{
                                                    return(
                                                        <MenuItem key={item.token}>

                                                            <Link href={'/tag/m/sub/[category]'} as={`/tag/m/sub/${item.slug}`}>
                                                                <a>
                                                                    <span className='text-secondary'>{item.title}</span>
                                                                </a>
                                                            </Link>

                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </SubMenu>
                                    )

                                } else {
                                    return(
                                        <MenuItem key={music.token}>
                                            <Link href={'/tag/m/[category]'} as={`/tag/m/${music.slug}`}>
                                                <a>
                                                    <span className='text-secondary'>{music.title}</span>
                                                </a>
                                            </Link>
                                        </MenuItem>
                                    )
                                }
                            })
                        }

                    </SubMenu>
                </Menu>


            </li>
        )
    };

    const videoMenu = movie_cat({
        title:'دسته بندی فیلم',
        mode: 'horizontal',
        openAnimation: 'slide-up',
        itemIcon,
        expandIcon,
    });

    const musicMenu = music_cat({
        title:'دسته بندی موزیک',
        mode: 'horizontal',
        openAnimation: 'slide-up',
        itemIcon,
        expandIcon,
    });

    return (
        <Container fluid className={`f7 px-lg-4 px-md-4 border-top ${reboot.rtl} bg-dark`}>
            <SideMenu pageWrapId={"page-wrap"}
                      open={menu}
                      close={closeMenu}
                      headerLinks={headerLinks}
                      search={openSearch}
            />
            <SearchBox/>
            <Row>
                <div className="col-5 col-md-9">
                    <nav className="navbar navbar-expand-md navbar-dark d-none d-xl-block">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mynavbar">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse pt-xl-3 pt-4" id="mynavbar">
                            <ul className="navbar-nav">

                                {
                                    headerLinks.map((item, index) => {
                                        if (!item.show) {

                                            if (!item.type){
                                            return (
                                                <HeaderItem key_index={index} path={item.path}
                                                            url_path={router.pathname} label={item.label}
                                                            close={closeMenu}/>
                                            )
                                            }else {
                                                if (item.type==='movie_cat') {
                                                    return videoMenu
                                                    // return movie_cat(item.label)
                                                    // <movie_cat title={item.label} />
                                                }else if (item.type==='music_cat'){
                                                    return musicMenu
                                                    // return music_cat(item.label)
                                                }
                                            }
                                        } else if (item.show === 'logout') {
                                            if (!isAuthenticated) {
                                                return (
                                                    <HeaderItem key_index={index} path={item.path}
                                                                url_path={router.pathname} label={item.label}
                                                                close={closeMenu}/>
                                                )
                                            }
                                        } else if (item.show === 'login') {
                                            if (isAuthenticated) {
                                                return (
                                                    <HeaderItem key_index={index} path={item.path}
                                                                url_path={router.pathname} label={item.label}
                                                                close={closeMenu}/>
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
                    <a className=" rounded mx-md-4 d-xl-none" onClick={() => setMenu(prev => !prev)}>
                        <img src="/img/open_menu.png" className="mt-4 pt-lg-3 mt-md-3 pt-md-1"/>
                    </a>
                </div>

                <div className="col-7 col-md-3 ">
                    <Link href={`/`}>
                        <a>
                            <img src={`${process.env.BaseUrl}${app_logo}`}
                                 className="img-fluid mt-2 d-block mr-auto mb-2"
                                 style={{width: '70px'}}/>
                        </a>
                    </Link>
                </div>
            </Row>
        </Container>
    )
};

const mapStateToProps = (state) => (
    {isAuthenticated: !!state.authentication.token}
);

export default connect(mapStateToProps, actions)(withRouter(Header));