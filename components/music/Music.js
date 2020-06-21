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

function Music({token, isAuthenticated}) {


    const [m_loading, setMLoading] = useState(true);
    const [music, setMusic] = useState();
    const [comments, setComment] = useState([]);

    const [music_link, setMusicLink] = useState('');
    const [convertInnfo, setConvertInnfo] = useState([]);
    const [mp4Audios, setMp4Audios] = useState([]);
    const [mTitle, setMTitle] = useState('');

    const [mark, setMark] = useState(0);
    const [mark_loading, setMarkLoading] = useState(false);

    const [like, setLike] = useState(0);
    const [like_loading, setLikeLoading] = useState(false);

    const [likeCount, setLikeCount] = useState(0);

    const [modalIsOpen, setIsOpen] = useState(false);
    useEffect(() => {
        async function getMusic() {

            await axios.get(`/api/music/${token}`)
                .then(res => {
                    console.log('music', res.data.data.music);
                    let {music, comments, bookmark, user_like} = res.data.data;
                    setMusic(music);
                    setMark(bookmark);
                    setLike(user_like);
                    getMusicLink(music.link);
                    setComment(comments);
                    setLikeCount(music.likeCount);
                    setMLoading(false);
                }).catch(err => console.log(err))
        }

        getMusic();
    }, []);

    async function getMusicLink(link) {

        if (music_link === '') {
            console.log('music link', link);
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
                    // setIsOpen(true);

                }).catch(err => {
                    console.log(err);
                    return false;
                })

        }
    }

    function handleBookmark(status) {

        setMarkLoading(true);
        if (status) {
            axios.get(`/api/bookmarks/musicHandler/addBookmark/${music.token}`)
                .then(response => {

                    console.log(response);
                    if (response.data.status === 1) {
                        setMark(status);
                        setMarkLoading(false)
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
                    }
                })
                .catch(err => console.log(err));
        }

    }

    function handleLike() {

        console.log('music token', music.token);
        setLikeLoading(true);
        axios.get(`/api/like/music/${music.token}`)
            .then(response => {

                console.log(response.data);
                let {like_status, likeCount} = response.data.data;
                setLike(like_status);
                setLikeCount(likeCount);
                setLikeLoading(false);
            })
            .catch(err => console.log(err));
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
                                                        music?.singers.map(signer => ` ${signer.name} `)
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

                            <LazyImage loading={m_loading} src={music?.cover}/>


                            <a href="#" className="text-center text-dark font-s">
                                <p className="pt-4 pb-5" dangerouslySetInnerHTML={{__html: music?.about}}/>
                            </a>
                            <h6 className="text-center">
                                {/*<a href="#">*/}
                                {/*امین و علی جعفری بی قرارم*/}
                                {/*</a>*/}
                            </h6>

                            <DownloadBox
                                convertInnfo={convertInnfo}
                                mp4Audios={mp4Audios}
                                filename={mTitle}
                            />

                            <div className="row justify-content-center">

                                <div className='col-12 my-2 pb-3'>
                                    <ReactAudioPlayer
                                        style={{width: '100%'}}
                                        src={music_link}

                                        controls
                                    />
                                </div>
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
                                            <p><i className='fas fa-download'/></p>
                                            <p>
                                                {
                                                    music ? music.downloadCount : ''
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

                            {/*<h6 className="mt-4">*/}
                            {/*<i className='fas fa-circle mr-1 color-orange'/>*/}
                            {/*نظرات کاربران*/}
                            {/*</h6>*/}


                            {/*<div className="progress mt-4" style={{height: ' 1px', backgroundColor: '#cccccc'}}>*/}
                            {/*<div className="progress-bar"/>*/}
                            {/*</div>*/}


                            <Container fluid className={`px-0 ${reboot.rtl}`} style={{backgroundColor: '#fbfbfd'}}>
                                <Comments music={music} isAuthenticated={isAuthenticated} type='music'
                                          comments={comments}/>
                            </Container>

                        </div>
                    </div>

                    <div className="col-12 col-lg-4 rounded  mt-3 pl-lg-0" style={{height: '100%'}}>
                        <div className="col-12 border bg-white rounded">
                            <div className="container pt-2 pb-5 px-0">

                                <div className="input_holder">
                                    <label>
                                        <p className="mt-3 text-secondary"><i className='fas fa-link mr-1'/>
                                            کد پخش انلاين براي وبلاگ
                                        </p>
                                    </label>
                                    <textarea className="w-100 text-right font-ms py-1 px-1">
                                        &lt;center&gt;&lt;audio controls preload="none" style="width:100%;" type="audio/mpeg" src="Array"&gt; مرورگر شما از پخش کننده پشتيباني نميکند&lt;/audio&gt;&lt;br&gt;&lt;a href="http://www.radii0javan.com" title=""&gt;&lt;/a&gt; &lt;/center&gt;
                                    </textarea>
                                </div>


                                <div className="input_holder mt-3"><label><p className="mt-3 text-secondary">
                                    <i className='fas fa-link mr-1'/> لینک کوتاه مطلب
                                </p>
                                </label>
                                    <input
                                        onClick="this.select();" type="text"
                                        className="w-100 text-right font-ms py-1 px-1"
                                        value="http://www.radii0javan.com/?p=80587"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 border bg-white rounded mt-3">

                            <p className="mt-4 font-s">
                                <i className="fas fa-circle mr-1 color-orange"/>
                                آهنگ های محبوب
                            </p>
                            <div className="vertical-tabs">
                                <ul className="nav nav-tabs mt-3" role="tablist">
                                    <li className="nav-item ">
                                        <a className="nav-link active  font-ms mx-md-3 mx-lg-1 mx-xl-3 rounded"
                                           data-toggle="tab" href="#pag1" role="tab" aria-controls="home"><p>هفته </p>
                                        </a>
                                    </li>
                                    <li className="nav-item ">
                                        <a className="nav-link  font-ms mx-3 mx-lg-1 mx-xl-3 rounded" data-toggle="tab"
                                           href="#pag2" role="tab" aria-controls="profile"><p>
                                            ماه </p></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link  font-ms mx-3 mx-xl-3  rounded" data-toggle="tab"
                                           href="#pag3" role="tab" aria-controls="messages"><p>
                                            سال</p></a>
                                    </li>
                                </ul>
                                <div className="tab-content pb-4 pt-2">
                                    <div className="tab-pane active" id="pag1" role="tabpanel">
                                        <div className="sv-tab-panel ">
                                            <p className="mt-2"><a href="#" className="font-ms text-hover">محسن یگانه
                                                خودخواه</a></p>
                                            <p className="mt-2"><a href="#" className="font-ms text-hover ">محسن یگانه
                                                خودخواه</a></p>
                                            <p className="mt-2"><a href="#" className="font-ms text-hover ">محسن یگانه
                                                خودخواه</a></p>
                                            <p className="mt-2"><a href="#" className="font-ms text-hover ">محسن یگانه
                                                خودخواه</a></p>
                                            <p className="mt-2"><a href="#" className="font-ms text-hover ">محسن یگانه
                                                خودخواه</a></p>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="pag2" role="tabpanel">
                                        <div className="sv-tab-panel ">
                                            <p className="mt-2"><a href="#" className="font-ms text-hover">محسن یگانه
                                                خودخواه</a></p>
                                            <p className="mt-2"><a href="#" className="font-ms text-hover ">محسن یگانه
                                                خودخواه</a></p>
                                            <p className="mt-2"><a href="#" className="font-ms text-hover ">محسن یگانه
                                                خودخواه</a></p>
                                            <p className="mt-2"><a href="#" className="font-ms text-hover ">محسن یگانه
                                                خودخواه</a></p>
                                            <p className="mt-2"><a href="#" className="font-ms text-hover ">محسن یگانه
                                                خودخواه</a></p>
                                        </div>
                                    </div>
                                    <div className="tab-pane " id="pag3" role="tabpanel">
                                        <div className="sv-tab-panel ">
                                            <p className="mt-2"><a href="#" className="font-ms text-hover">محسن یگانه
                                                خودخواه</a></p>
                                            <p className="mt-2"><a href="#" className="font-ms text-hover ">محسن یگانه
                                                خودخواه</a></p>
                                            <p className="mt-2"><a href="#" className="font-ms text-hover ">محسن یگانه
                                                خودخواه</a></p>
                                            <p className="mt-2"><a href="#" className="font-ms text-hover ">محسن یگانه
                                                خودخواه</a></p>
                                            <p className="mt-2"><a href="#" className="font-ms text-hover ">محسن یگانه
                                                خودخواه</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
        width: '60%',
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