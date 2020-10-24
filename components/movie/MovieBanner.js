import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import movieStyle from '../../style/Movie.module.css';
import {connect} from 'react-redux'
import axios from 'axios';
import Modal from 'react-modal';
import PlayerPage from "./Player";
import player from './../../style/player.module.css';
import reboot from './../../style/reboot.module.css';
import ToastsAlert from "../ToastsAlert";
// import style from '@zeit/next-css';
function MovieBanner({movie, actors, isAuthenticated, bookmark, movie_access}) {

    const [mark, setMark] = useState(0);
    const [mark_loading, setMarkLoading] = useState(false);

    // 0 => default
    // 1 => liked
    // -1 => disliked
    const [likeStatus, setLikeStatus] = useState(0);
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDisLikeCount] = useState(0);

    const [player_mode, setPlayerMode] = useState('link');//'config'
    const [player_config_json, setPlayerConfigJson] = useState('');

    const [imdb_rating, setImdb_rating] = useState('');
    const [rotten_tomatoes_rating, setRotten_tomatoes_rating] = useState('');

    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('#fd3746');
    let commentMessageTimeOut;

    function alertTimeOutHandle() {
        clearTimeout(commentMessageTimeOut);
        commentMessageTimeOut = setTimeout(() => {
            setAlert(false);
        }, 4000);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '85%',
            border: 'none',
            background: 'none',
            zIndex: '100000000',
        }
    };

    var subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);


    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }


    useEffect(() => {
        setMark(bookmark);

        setLikeStatus(movie.auth_user_has_liked);
        setLikeCount(movie.likeCount);
        setDisLikeCount(movie.dislikeCount);

        setImdb_rating('');
        setRotten_tomatoes_rating('');

        async function getImdb() {
            await  axios.post(`http://www.omdbapi.com/?apikey=ead1d321&i=${movie.imdb_id}`).then(response => {
                let imdb_data = response.data;
                console.log('imdb data', imdb_data);
                setImdb_rating(imdb_data?.Ratings[0]?.Value);
                setRotten_tomatoes_rating(imdb_data?.Ratings[1]?.Value);
            }).catch(error => console.log(error));
        }

        getImdb();

    }, [movie]);

    // function openVideoPlayerModal() {
    //
    //     getPlayerConfigJson();
    //
    // }

    async function getPlayerConfigJson() {

        if (isAuthenticated) {
            if (player_config_json === '') {
                // await axios.get(`${process.env.ArvanApi}/videos/${movie.link}`, {
                //     headers: {
                //         'Authorization': process.env.ArvanApiKey,
                //         'Accept': 'application/json'
                //     }
                // })
                //     .then(res => {
                //         console.log(res.data.data.player_url);
                //
                //         let {player_url} = res.data.data;
                //         setPlayerConfigJson(player_url);
                //         setIsOpen(true);
                //
                //     }).catch(err => {
                //         console.log(err);
                //         setAlertMessage('متاسفیم،مشکلی در پخش فیلم پیش آمد');
                //         setAlert(true);
                //         alertTimeOutHandle();
                //     })

                // await axios.get(`http://2.187.209.55:8080/video/stream/mp4/test-145MG`)
                //     .then(res => {
                //         console.log(res);
                //
                //         // let {player_url} = res.data.data;
                //         // setPlayerConfigJson(player_url);
                //
                //         // setIsOpen(true);
                //
                //     }).catch(err => {
                //         console.log(err);
                //         setAlertMessage('متاسفیم،مشکلی در پخش فیلم پیش آمد');
                //         setAlert(true);
                //         alertTimeOutHandle();
                //     })

                // await axios.post(`http://2.187.209.55:8080/video/stream/mp4/test-145MG`)
                //     .then(res => {
                //         console.log(res);
                //
                //         // let {player_url} = res.data.data;
                //         // setPlayerConfigJson(player_url);
                //
                //         // setIsOpen(true);
                //
                //     }).catch(err => {
                //         console.log(err);
                //         setAlertMessage('متاسفیم،مشکلی در پخش فیلم پیش آمد');
                //         setAlert(true);
                //         alertTimeOutHandle();
                //     });

                setPlayerConfigJson('http://2.187.209.55:8080/video/stream/mp4/test-145MG');
                setIsOpen(true);
            } else {
                console.log('set player_url in state');
                setIsOpen(true);
            }
        } else {
            setAlertMessage(' ابتدا باید وارد شوید');
            setAlert(true);
            alertTimeOutHandle();
        }
    }

    function handleBookmark(status) {

        if (isAuthenticated) {
            setMarkLoading(true);
            if (status) {
                axios.get(`/api/addBookmark/${movie.token}`)
                    .then(response => {

                        console.log(response);
                        if (response.data.status) {
                            setMark(status);
                            setMarkLoading(false)
                        }
                    })
                    .catch(err => console.log(err));
            }
            if (!status) {
                axios.get(`/api/removeBookmark/${movie.token}`)
                    .then(response => {
                        console.log(response);
                        if (response.data.status) {
                            setMark(status);
                            setMarkLoading(false)
                        }
                    })
                    .catch(err => console.log(err));
            }

        } else {
            setAlertMessage(' ابتدا باید وارد شوید');
            setAlert(true);
            alertTimeOutHandle();
        }

    }

    function handleLike(movie_token) {

        if (isAuthenticated) {
            // console.log(comment_id);
            axios.get(`/api/movieLike/${movie_token}/like`)
                .then(res => {
                    console.log('like', res.data);
                    let newLikeStatus = res.data.like_status;
                    let counts = res.data.counts;
                    setLikeStatus(newLikeStatus);
                    setLikeCount(counts.likeCount);
                    setDisLikeCount(counts.dislikeCount);
                })
                .catch(err => console.log(err))

        } else {
            setAlertMessage(' ابتدا باید وارد شوید');
            setAlert(true);
            alertTimeOutHandle();
        }
    }

    function handleDisLike(movie_token) {

        if (isAuthenticated) {
            // console.log(comment_id)
            axios.get(`/api/movieLike/${movie_token}/dislike`).then(res => {
                console.log('dislike', res.data.like_status);
                let newLikeStatus = res.data.like_status;
                let counts = res.data.counts;
                setLikeStatus(newLikeStatus);
                setLikeCount(counts.likeCount);
                setDisLikeCount(counts.dislikeCount);
            }).catch(err => console.log(err))

        } else {
            setAlertMessage(' ابتدا باید وارد شوید');
            setAlert(true);
            alertTimeOutHandle();
        }
    }

    function showNoAuthAlert() {
        setAlertMessage(' ابتدا باید وارد شوید');
        setAlert(true);
        alertTimeOutHandle();
    }



    return (
        <>
            <Container fluid className={` pb-5 ${movieStyle.movie} ${movieStyle.rtl}`}
                       style={{minHeight: '300px'}}>

                <div className='d-md-block d-none'  style={{
                    backgroundImage:'url("'+`${process.env.BaseUrl+movie.poster}`+'")',
                    width: "100%",
                    left:0,
                    right:0,
                    top:0,
                    bottom:0,
                    position:'absolute',
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }} />

                <div className='d-md-none d-block'  style={{
                    backgroundImage:'url("'+`${process.env.BaseUrl+movie.poster}`+'")',
                    width: "100%",
                    left:0,
                    right:0,
                    top:0,
                    height:'300px',
                    position:'absolute',
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }} />
                <ToastsAlert alert_show={alert} message={alertMessage} color={alertColor}/>
                <div className={movieStyle.dark_bg}/>
                <div className="row mt-4 pl-3 ">
                    <div className="col-md-4 col-lg-3 text-center ">
                        <img src={`${process.env.BaseUrl}${movie.cover}`} className={movieStyle.movie_cover}/>
                    </div>

                    <div className=" col-md-8 col-lg-9 text-white mt-3 mt-lg-0 px-5 px-md-3 px-lg-1"
                         style={{zIndex: '12', position: 'relative', bottom: '0%'}}>
                        <h5 className="text-white">
                            {movie.title}
                        </h5>

                        <div className={`row pl-3 mt-4 ${movieStyle.font_ms}`}>
                            <div className='col-12'>

                                <p className="font-ms ml-3 d-inline-block">
                                    {movie.time}
                                    دقیقه
                                </p>

                                <p className="font-ms mx-3 d-inline-block">
                                    {/*{movie.imdb_rating}*/}

                                    <span className="mr-1 font-s">
                                            IMDB: {imdb_rating}
                                    </span>
                                </p>

                                <p className="font-ms mx-3 d-inline-block">
                                    {
                                        movie.score !== null ?
                                            <>
                                                <i className="fas fa-heart mr-1"/>
                                                {movie.score}
                                                {` % `}
                                            </>
                                            : ''
                                    }

                                </p>

                            </div>
                        </div>

                        <div className="row pl-3 mt-4">
                            <div className='col-12'>
                                <p>
                                    {movie.plot}
                                </p>
                            </div>
                        </div>
                        <div className="row pl-3 mt-4">
                            <div className='col-12'>
                                {
                                    isAuthenticated ?
                                        <>
                                            <div onClick={() => {
                                                getPlayerConfigJson()
                                            }}
                                                 type="button"
                                                 className="btn btn-success font-md">تماشا
                                            </div>

                                        </>
                                        :
                                        <>
                                            <Link href={`/login`}>
                                                <a>
                                                    <button type="button" className="btn btn-warning font-md">ورود و
                                                        تماشا
                                                    </button>
                                                </a>
                                            </Link>
                                        </>
                                }

                                <button type="button"
                                        className="btn btn-outline-red  font-md mr-3 text-white"
                                        onClick={() => {
                                            isAuthenticated ?
                                                mark ?
                                                    handleBookmark(false)
                                                    :
                                                    handleBookmark(true)
                                                :
                                                showNoAuthAlert()
                                        }}

                                >
                                    <i className={`far fa-bookmark  text-center ${mark ? 'fa' : ''}`}/>
                                </button>


                            </div>
                        </div>
                        < div className="row pl-3 mt-4">
                            <div className='col-12'>
                                <p className="font-s"> ستارگان :
                                    {
                                        actors?.map(actor => {
                                            return (
                                                <span style={{display: 'inline-flex'}} key={actor.id} className="mx-2">
                                <Link href='/crew/[slug]' as={`/crew/${actor.slug}`}>
                                <a>
                                {actor.name}
                                </a>
                                </Link>
                                </span>
                                            )
                                        })
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="row pl-3 mt-4">

                            <div className='col-12'>
                                {
                                    movie.age ?
                                        <>
                                            <span className="badge badge-warning ">
                                        <img src={`${process.env.BaseUrl}${movie.age?.icon}`}
                                             className={`${movieStyle.ageIcon}`}/>
                                    </span>
                                            < span className={` mr-2 ${movieStyle.font_ms} `}>
                                        {movie.age?.title}
                                    </span>
                                        </>
                                        : ''
                                }

                            </div>

                        </div>

                        <div className="row pl-3 mt-4">

                            <div className='col-12'>

                                {/*liked*/}
                                <p className={`pt-4 font-s d-inline-block like ${likeStatus === 1 ? 'liked' : ''}`}>
                                <span className='like-count p-1'>
                                    {
                                        likeCount
                                    }
                                    +
                                </span>
                                    <span className="svg-icon-wrapper is-icon-thumbs-up-new ">
                                        <svg
                                            onClick={() => handleLike(movie.token)}
                                            version="1.1" xmlns="http://www.w3.org/2000/svg" style={{cursor: 'pointer'}}
                                            viewBox="0 0 32 32">

                                        <path
                                            d="M17.497 3.604l-7.54 7.54a2.72 2.72 0 0 0-.79 1.92v13.598a2.73 2.73 0 0 0 2.722 2.722h12.25a2.741 2.741 0 0 0 2.505-1.647l4.437-10.358c1.143-2.695-.83-5.69-3.757-5.69h-7.69l1.293-6.234a2.052 2.052 0 0 0-.558-1.865 2.025 2.025 0 0 0-2.872.014zM3.722 29.384a2.73 2.73 0 0 0 2.723-2.722v-10.89a2.73 2.73 0 0 0-2.723-2.722A2.73 2.73 0 0 0 1 15.772v10.89a2.73 2.73 0 0 0 2.722 2.722z"
                                            id="icon-thumbs-up-new"/>

                                </svg>
                                </span>
                                    {/*<i className='far fa-thumbs-down mr-1 text-danger'/>*/}
                                </p>

                                {/*disliked*/}
                                <p className={`pt-4 font-s mr-4 d-inline-block dislike ${likeStatus === -1 ? 'disliked' : ''}`}>
                                <span className='dislike-count p-1'>
                                {
                                    dislikeCount
                                }
                                    -
                                </span>

                                    <span className="svg-icon-wrapper is-icon-thumbs-down-new ">
                                    <svg

                                        onClick={() => handleDisLike(movie.token)}
                                        version="1.1" xmlns="http://www.w3.org/2000/svg" style={{cursor: 'pointer'}}
                                        viewBox="0 0 32 32">
                                        <path
                                            d="M14.906 28.78l7.527-7.54a2.72 2.72 0 0 0 .79-1.92V5.722A2.73 2.73 0 0 0 20.5 3H8.264a2.708 2.708 0 0 0-2.49 1.647L1.335 15.005c-1.157 2.695.817 5.69 3.743 5.69h7.69l-1.293 6.234c-.136.68.068 1.374.558 1.864.803.79 2.083.79 2.872-.013zM28.681 3a2.73 2.73 0 0 0-2.722 2.722v10.89a2.73 2.73 0 0 0 2.722 2.722 2.73 2.73 0 0 0 2.722-2.723V5.722A2.73 2.73 0 0 0 28.681 3z"
                                            id="icon-thumbs-down-new"/>
                                    </svg>
                                </span>
                                    {/*<i className='far fa-thumbs-up mr-1 text-success'/>*/}
                                </p>
                            </div>
                        </div>


                    </div>
                </div>


            </Container>

            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <div className={`card ${reboot.rtl}`}>
                    <div className='card-header'>
                        <span>
                            {
                                ` تماشای فیلم `
                            }
                            {
                                movie.title
                            }
                        </span>
                        <button style={{float: 'left'}} className='btn btn-light d-inline '
                                onClick={() => setIsOpen(false)}>بستن
                        </button>
                    </div>

                    <div className='card-body p-0'>
                        {
                            isAuthenticated ?
                                (movie_access && (
                                        <Container className='p-0'>


                                            {
                                                player_mode === 'link' ?

                                                    <div className={`row ${player._window}`}>
                                                        <PlayerPage url='https://video.kartoona.com/media/13343/playlist.m3u8'/>
                                                    </div>

                                                    :

                                                    <div className="r1_iframe_embed" style={{
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                        width: '100%',
                                                        height: 'auto',
                                                        paddingTop: ' 56.25%'
                                                    }}>
                                                        <iframe
                                                            style={{
                                                                position: 'absolute',
                                                                top: '0',
                                                                left: '0',
                                                                width: '100%',
                                                                height: '100%',
                                                                border: '0'
                                                            }}
                                                            src={player_config_json}
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen="true" webkitallowfullscreen="true"
                                                            mozallowfullscreen="true"/>
                                                    </div>

                                            }
                                        </Container>
                                    ) ||
                                    <Container className='p-5'>
                                        <div className="row justify-content-center">
                                            <div className='alert alert-warning'>
                                                <Link href={'/packagelist'}>
                                                    <a>
                                                        برای مشاهده ی ویدیوها باید اشتراک تهیه کنید.
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    </Container>
                                )
                                : ''
                        }
                    </div>

                </div>
            </Modal>
        </>
    )
}

const mapStateToProps = (state) => (
    {
        isAuthenticated: !!state.authentication.token,
    }
);

export default connect(mapStateToProps)(MovieBanner);