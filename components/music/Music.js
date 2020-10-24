import React, {useEffect, useState} from 'react';
import axios from 'axios';
import reboot from './../../style/reboot.module.css';
// import Comments from "./Comments";
import Head from 'next/head';
import {connect} from 'react-redux';
import LazyImage from "../LazyImage";
import {Container} from 'react-bootstrap';
import Comments from './Comments';

import ReactAudioPlayer from 'react-audio-player';
import DownloadBox from "./DownloadBox";

import Modal from 'react-modal';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Link from 'next/link';
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from 'react-share';
import ToastsAlert from "../ToastsAlert";
import {MusicCard2} from "./MusicCard2";
import {MusicCard3} from "./MusicCard3";

function Music({token, isAuthenticated}) {


    const [m_loading, setMLoading] = useState(true);
    const [music, setMusic] = useState();
    const [comments, setComment] = useState([]);

    const [music_link, setMusicLink] = useState('');
    const [convertInnfo, setConvertInnfo] = useState([]);
    const [mp4Audios, setMp4Audios] = useState([]);
    const [mp4Videos, setMp4Video] = useState([]);
    const [mTitle, setMTitle] = useState('');

    const [mark, setMark] = useState(0);
    const [mark_loading, setMarkLoading] = useState(false);

    const [like, setLike] = useState(0);
    const [like_loading, setLikeLoading] = useState(false);

    const [likeCount, setLikeCount] = useState(0);
    const [popular, setPopular] = useState([]);
    const [similars, setSimilars] = useState([]);

    const [modalIsOpen, setIsOpen] = useState(false);

    const [album, setAlbum] = useState([]);
    const [player_config_json, setPlayerConfigJson] = useState('');

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

    useEffect(() => {
        async function getMusic() {

            await axios.get(`/api/music/${token}`)
                .then(res => {
                    console.log('api', res.data.data);
                    let {music, comments, bookmark, user_like, popular, similar_musics, album} = res.data.data;

                    if (music.type=='single' || music.type=='album'){
                        getMusicLink(music.link);
                    }else{
                        getMusicVideoLink(music.link);
                    }

                    setMusic(music);
                    setMark(bookmark);
                    setLike(user_like);

                    setComment(comments);
                    setPopular(popular);
                    setLikeCount(music.likeCount);
                    setSimilars(similar_musics);
                    setAlbum(album);



                }).catch(err => console.log(err))
        }

        getMusic();
    },[token]);

    async function getMusicLink(link) {

        // if (music_link === '') {
            console.log('music link', link);

            // await axios.get(`/api/music/abr_arvan/${link}`)
            //     .then(res => {
            //         console.log('music AbrArvan', res);
            //
            //         // let {audio_url, convert_info, mp4_audios, title} = res.data.data;
            //         // console.log('music AbrArvan audio_url', audio_url);
            //         // setMusicLink(audio_url);
            //         // setConvertInnfo(convert_info);
            //         // setMp4Audios(mp4_audios);
            //         // setMTitle(title);
            //
            //     }).catch(err => {
            //         console.log('ارور عدم یافتن آیدی موزیک');
            //         return false;
            //     });

            await axios.get(`${process.env.ArvanApi}/audios/${link}`, {
                headers: {
                    'Authorization': process.env.ArvanApiKey,
                    'Accept': 'application/json'
                }
            })
                .then(res => {
                    console.log('music Arvan', res);

                    let {audio_url, convert_info, mp4_audios, title} = res.data.data;
                    setMusicLink(audio_url);
                    setConvertInnfo(convert_info);
                    setMp4Audios(mp4_audios);
                    setMTitle(title);
                    setMLoading(false);
                    // setIsOpen(true);

                }).catch(err => {
                    console.log('ارور عدم یافتن آیدی موزیک');
                    return false;
                })

        // }
    }

    async function getMusicVideoLink(link) {

        // if (music_link === '') {
            console.log('music_video link', link);

            // await axios.get(`/api/music/abr_arvan/${link}`)
            //     .then(res => {
            //         console.log('music AbrArvan', res);
            //
            //         // let {audio_url, convert_info, mp4_audios, title} = res.data.data;
            //         // console.log('music AbrArvan audio_url', audio_url);
            //         // setMusicLink(audio_url);
            //         // setConvertInnfo(convert_info);
            //         // setMp4Audios(mp4_audios);
            //         // setMTitle(title);
            //
            //     }).catch(err => {
            //         console.log('ارور عدم یافتن آیدی موزیک');
            //         return false;
            //     });

        await axios.get(`${process.env.ArvanApi}/videos/${link}`, {
            headers: {
                'Authorization': 'Apikey 23d5133b-cc28-4c90-b505-701610cac152',
                // 'Authorization': process.env.ArvanApiKey,
                'Accept': 'application/json'
            }
        })
            .then(res => {
                // console.log(res.data.data.player_url);

                let {player_url, convert_info, mp4_videos, title} = res.data.data;
                setPlayerConfigJson(player_url);
                setConvertInnfo(convert_info);
                setMp4Video(mp4_videos);
                setMTitle(title);
                setMLoading(false);


                // setIsOpen(true);

            }).catch(err => {
                console.log(err);
                setAlertMessage('متاسفیم،مشکلی در پخش فیلم پیش آمد');
                setAlert(true);
                alertTimeOutHandle();
            })

        // }
    }

    function handleBookmark(status) {

        if (isAuthenticated) {
            setMarkLoading(true);
            if (status) {
                axios.get(`/api/bookmarks/musicHandler/addBookmark/${music.token}`)
                    .then(response => {

                        console.log(response);
                        let {status} = response.data;
                        if (status === 1) {
                            setMark(status);
                            setMarkLoading(false)
                        } else {
                            setMark(false);
                            setMarkLoading(false);
                            if (status === -2) {

                            }
                        }
                    })
                    .catch(err => console.log(err));
            }
            if (!status) {
                axios.get(`/api/bookmarks/musicHandler/removeBookmark/${music.token}`)
                    .then(response => {
                        console.log(response);
                        if (response.data.status === 1) {
                            setMark(status);
                            setMarkLoading(false)
                        } else {
                            setMark(true);
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
    function handleLike() {

        console.log('music token', music.token);
        if (isAuthenticated) {
            setLikeLoading(true);
            axios.get(`/api/like/music/${music.token}`)
                .then(response => {

                    let {status} = response.data.data;
                    setLikeLoading(false);
                    if (status === true) {
                        console.log(response.data);
                        let {like_status, likeCount} = response.data.data;
                        setLike(like_status);
                        setLikeCount(likeCount);

                    }

                })
                .catch(err => console.log(err));
        } else {
            setAlertMessage(' ابتدا باید وارد شوید');
            setAlert(true);
            alertTimeOutHandle();
        }
    }


    return (

        <>
            <Head>
                <title>
                    {process.env.AppName}
                    -
                    {music?.title}
                </title>
            </Head>
            <div className={`container  pt-4 pb-4 ${reboot.rtl}`}>
                <ToastsAlert alert_show={alert} message={alertMessage} color={alertColor}/>
                <div className="row  justify-content-between pt-4 mx-0">
                    <div className="col-12  col-lg-8 px-0">
                        <div className="col-12  col-lg-12  mt-3 pb-4 border bg-white rounded">
                            <div className="row pb-4 pt-2">
                                <div className="col-12 col-md-7">

                                    <p className="mt-3" style={{minHeight: '25px'}}>
                                        {
                                            music?.title
                                        }
                                    </p>
                                    <div className='row'>
                                        <div className='col-12 '>
                                            <p className="font-ss mt-1 d-inline ml-3">خواننده :

                                                <span>
                                                    {
                                                        music?.singers.map(signer => {
                                                            return <>
                                                                <Link href='/crew/[slug]' as={`/crew/${signer.slug}`}>
                                                                    <a>
                                                                        {` ${signer.name} `}
                                                                    </a>
                                                                </Link>
                                                            </>
                                                        })
                                                    }
                                                    </span>
                                            </p>

                                            <p className="font-ss mt-1 d-inline">ارسال شده در :
                                                <span>
                                                    {
                                                        music?.created_at
                                                    }
                                            </span>
                                            </p>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-12 col-md-5">
                                    <div className="row float-left mt-3 ml-2">

                                        <div className=" mr-2 p-2">
                                            <i onClick={() => handleLike()}
                                               style={{cursor: 'pointer'}}
                                               className={`far fa-heart pt-1 f12
                                               ${like_loading ? 'text-warning' : like ? 'text-danger fa' : ''}`}/>
                                        </div>

                                        <div className=" mr-2 p-2">
                                            <i onClick={() => handleBookmark(!mark)}
                                               style={{cursor: 'pointer'}}
                                               className={`far fa-bookmark pt-1 f12
                                               ${mark_loading ? 'text-warning' : mark ? 'text-info fa' : ''}
                                               `}
                                            />
                                        </div>

                                        <button type="button" className="btn btn-heart">
                                            <i onClick={() => setIsOpen(true)} className='fas fa-share-alt f12 pt-1'/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="progress" style={{height: '1px'}}>
                                <div className="progress-bar"/>
                            </div>


                            <p className="pt-4 pb-4 text-dark font-s" dangerouslySetInnerHTML={{__html: music?.about}}/>

                            {
                                music?.type==='music_video'?
                                    <>
                                        <div className="r1_iframe_embed mb-3" style={{
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
                                    </>
                                    :
                                    <LazyImage loading={m_loading} src={music?.cover}/>
                            }




                            {
                                music?.type==='music_video'?
                                   <>
                                       {/*<VideoDownloadBox*/}
                                           {/*convertInnfo={convertInnfo}*/}
                                           {/*mp4Audios={mp4Audios}*/}
                                           {/*filename={mTitle}*/}
                                           {/*m_loading={m_loading}*/}
                                       {/*/>*/}
                                   </>
                                    :
                                    <>
                                        <DownloadBox
                                            convertInnfo={convertInnfo}
                                            mp4Audios={mp4Audios}
                                            filename={mTitle}
                                            m_loading={m_loading}
                                        />
                                    </>
                            }



                            <div className="row justify-content-center">

                                {
                                    music?.type==='music_video'?
                                        <>
                                            {/*<VideoDownloadBox*/}
                                            {/*convertInnfo={convertInnfo}*/}
                                            {/*mp4Audios={mp4Audios}*/}
                                            {/*filename={mTitle}*/}
                                            {/*m_loading={m_loading}*/}
                                            {/*/>*/}
                                        </>
                                        :
                                        <>
                                            <div className='col-12 my-2 pb-3'>
                                                <ReactAudioPlayer
                                                    style={{width: '100%'}}
                                                    src={music_link}
                                                    controls
                                                />
                                            </div>
                                        </>
                                }

                            </div>

                            <div className="row justify-content-center">
                                <div className="col-md-6">
                                    <div className="row text-center text-secondary font-s">
                                        <div className="col-3 ">
                                            <p><i className='far fa-eye'/></p>
                                            <p>
                                                {
                                                    music ? music.viewCount : ''
                                                }

                                            </p>
                                        </div>
                                        <div className="col-3 border-right">
                                            <p><i className='fas fa-comments'/></p>
                                            <p>
                                                {
                                                    music ? music.commentCount : ''
                                                }

                                            </p>
                                        </div>
                                        <div className="col-3 border-right ">
                                            <p><i className='fas fa-heart'/></p>
                                            <p>
                                                {
                                                    music ? likeCount : ''
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12  col-lg-12  mt-3 pb-4 border bg-white rounded">

                            <Container fluid className={`px-0 ${reboot.rtl}`} style={{backgroundColor: '#fbfbfd'}}>
                                <Comments music={music} isAuthenticated={isAuthenticated} type='music'
                                          comments={comments}/>
                            </Container>

                        </div>
                    </div>
                    <div className="col-12 col-lg-4 rounded  mt-3 pl-lg-0" style={{height: '100%'}}>

                        {
                            music?.type === 'album' ?
                                <>
                                    <div className="col-12 border bg-white rounded pb-3 mb-3"
                                         style={{minHeight: '300px'}}>
                                        <p className="mt-4 mb-3 font-s">
                                            <i className="fas fa-circle ml-1 color-orange"/>
                                            آلبوم
                                            <Link as={`/music/${album.token}`} href='/music/[token]'>
                                                <a>
                                                    {` ${album.title} `}
                                                </a>
                                            </Link>
                                        </p>
                                        <div className='row'>
                                            {
                                                // console.log('similars',similars)
                                                album?.tracks?.map(item => {
                                                    return (
                                                        <MusicCard3 music={item}/>
                                                    )
                                                })
                                            }
                                        </div>
                                        {/*<div className='col-12'>*/}

                                        {/*</div>*/}
                                    </div>
                                </>
                                : ''
                        }
                        <div className="col-12 border bg-white rounded pb-3 mb-3" style={{minHeight: '300px'}}>
                            <p className="mt-4 mb-3 font-s">
                                <i className="fas fa-circle ml-1 color-orange"/>
                                آهنگ های محبوب
                            </p>
                            <Tabs defaultActiveKey="week" id="uncontrolled-tab-example">
                                <Tab eventKey="week" title="هفته" className='pt-3'>
                                    <>

                                        {
                                            popular?.week?.map(week_item => {
                                                return (
                                                    <p className="mt-2 mb-1">
                                                        <Link href={`/music/[token]`} as={`/music/${week_item.token}`}>
                                                            <a className="font-ms text-hover">
                                                                {week_item.singers.map(s => {
                                                                    return (
                                                                        s.name + ' ,'
                                                                    )
                                                                })}
                                                                {` `}

                                                                {week_item.title}
                                                            </a>
                                                        </Link>
                                                    </p>
                                                )
                                            })
                                        }

                                    </>
                                </Tab>
                                <Tab eventKey="month" title="ماه" className='pt-3'>

                                    <>

                                        {
                                            popular?.month?.map(month_item => {
                                                return (
                                                    <p className="mt-2 mb-1">
                                                        <Link href={`/music/[token]`} as={`/music/${month_item.token}`}>
                                                            <a className="font-ms text-hover">
                                                                {month_item.singers.map(s => {
                                                                    return (
                                                                        s.name + ' ,'
                                                                    )
                                                                })}
                                                                {` `}

                                                                {month_item.title}
                                                            </a>
                                                        </Link>
                                                    </p>
                                                )
                                            })
                                        }

                                    </>
                                </Tab>
                                <Tab eventKey="year" title="سال" className='pt-3'>

                                    <>
                                        {
                                            popular?.year?.map(year_item => {
                                                return (
                                                    <p className="mt-2 mb-1">
                                                        <Link href={`/music/[token]`} as={`/music/${year_item.token}`}>
                                                            <a className="font-ms text-hover">
                                                                {year_item.singers.map(s => {
                                                                    return (
                                                                        s.name + ' ,'
                                                                    )
                                                                })}
                                                                {` `}

                                                                {year_item.title}
                                                            </a>
                                                        </Link>
                                                    </p>
                                                )
                                            })
                                        }

                                    </>
                                </Tab>
                            </Tabs>
                        </div>

                        <div className="col-12 border bg-white rounded pb-3 mb-3" style={{minHeight: '300px'}}>
                            <p className="mt-4 mb-3 font-s">
                                <i className="fas fa-circle ml-1 color-orange"/>
                                آهنگ های مشابه
                            </p>
                            <div className='row'>
                                {
                                    // console.log('similars',similars)
                                    similars?.map(item => {
                                        return (
                                            <MusicCard2 music={item}/>
                                        )
                                    })
                                }
                            </div>
                            {/*<div className='col-12'>*/}

                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>

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
                                ` اشتراک گذاری موزیک `
                            }
                        </span>
                        <button style={{float: 'left'}} className='btn btn-light d-inline '
                                onClick={() => setIsOpen(false)}>بستن
                        </button>
                    </div>

                    <div className='card-body'>
                        <Container>
                            <div className='row py-5 px-2 justify-content-center'>

                                <div className='col-lg-1 col-md-3 col-4'>
                                    <EmailShareButton url={window.location}>
                                        <EmailIcon/>
                                    </EmailShareButton>

                                </div>
                                <div className='col-lg-1 col-md-3 col-4'>
                                    <FacebookShareButton url={window.location}>
                                        <FacebookIcon/>
                                    </FacebookShareButton>
                                </div>
                                <div className='col-lg-1 col-md-3 col-4'>
                                    <WhatsappShareButton url={window.location}>
                                        <WhatsappIcon/>
                                    </WhatsappShareButton>
                                </div>

                                <div className='col-lg-1 col-md-3 col-4'>
                                    <TelegramShareButton url={window.location}>
                                        <TelegramIcon/>
                                    </TelegramShareButton>

                                </div>
                                <div className='col-lg-1 col-md-3 col-4'>
                                    <TwitterShareButton url={window.location}>
                                        <TwitterIcon/>
                                    </TwitterShareButton>
                                </div>

                            </div>
                        </Container>
                    </div>
                </div>
            </Modal>
        </>
    )
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

const mapStateToProps = (state) => (
    {
        isAuthenticated: !!state.authentication.token,
    }
);
export default connect(mapStateToProps)(Music);