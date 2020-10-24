import React, {useEffect, useState} from 'react';
import reboot from './../../style/reboot.module.css';
import axios from 'axios';
import {Badge, Spinner} from "react-bootstrap";

function MusicBanner({title, musics}) {

    // console.log(musics);
    let musicsCount = musics.length;
    const [loading, setLoading] = useState(true);
    const [player, setPlayer] = useState();
    const [player_token, setPlayerToken] = useState(musicsCount > 0 ? musics[0].token : null);
    const [player_image, setPlayerImage] = useState(musicsCount > 0 ? process.env.BaseUrl + musics[0].cover : null);
    const [player_title, setPlayerTitle] = useState('');

    function play(token) {
        musics.map(music => {
            if (music.token === token) {
                if (token !== player_token) {
                    setPlayerToken(token);
                    setLoading(true);
                    getMusicLink(music.link);

                } else {
                    console.log('تکراری');
                    player.play();
                }
                setPlayerImage(process.env.BaseUrl + music.cover)
            }
        });

    }

    async function getMusicLink(link) {
        if (link !== '') {

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
                    setPlayerTitle(title);
                    player.src = audio_url;
                    player.play();
                    setLoading(false)
                }).catch(err => {
                    console.log(err);
                    return false;
                })

        }
    }

    useEffect(() => {

        console.log('music gallery effect');

        async function getMusicInitialLink(link) {
            if (link !== '') {

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
                        setPlayerTitle(title);
                        player.src = audio_url;
                        setLoading(false)
                    }).catch(err => {
                        console.log(err);
                        return false;
                    })

            }

        }

        getMusicInitialLink(musicsCount > 0 ? musics[0].link : '')
    }, [player]);

    function nextMusic() {
        // console.log('next');
        setLoading(true);
        let musicsLen = musics.length;
        musics.map((music, index) => {
            if (music.token === player_token) {
                let target = index + 1;
                if (target === musicsLen) {
                    target = 0
                }
                let nextMusic = musics[target];
                setPlayerImage(process.env.BaseUrl + nextMusic.cover);
                setPlayerToken(nextMusic.token);
                getMusicLink(nextMusic.link);
            }
        });
    }

    function prevMusic() {
        // console.log('prev');

        setLoading(true);
        let musicsLen = musics.length;
        musics.map((music, index) => {
            if (music.token === player_token) {
                let target = index - 1;
                if (target < 0) {
                    target = musicsLen - 1
                }
                let prevMusic = musics[target];
                setPlayerImage(process.env.BaseUrl + prevMusic.cover);
                setPlayerToken(prevMusic.token);
                getMusicLink(prevMusic.link);
            }
        });
    }

    function handlePlay() {
        player.play();

    }

    function handlePause() {

        player.pause()
    }

    return (

        <>
            <div className={`container-fluid px-md-3 px-lg-3 py-5 ${reboot.rtl} `}>
                <div className='pr-2 mb-2'>
                    <i className='fa fa-rss  pl-2'/>
                    {
                        title
                    }
                </div>
                <section className="audio-player card bg-light" style={{border: '1px solid #ebebeb',}}>
                    <div className="card border-0"
                         style={{boxShadow: ' 0 1px 4px 0 rgba(0,0,0,.05)', minHeight: '500px'}}>
                        <div className="row">
                            <div className="col-12 col-lg-4 order-lg-first order-last bor-l pl-xl-0 ">

                                <ul className="playlist list-group list-group-flush ">
                                    {
                                        musics?.map((music, index) => {
                                            return (

                                                <li
                                                    key={music.token}
                                                    className={`list-group-item playlist-item py-4 ${player_token === music.token ? 'active' : ''}`}
                                                    onClick={() => {
                                                        play(music.token)
                                                    }}
                                                    style={{cursor: 'pointer'}}
                                                >

                                                    <h5 className='d-inline-block'>
                                                        <Badge pill variant="light">
                                                            {
                                                                index + 1
                                                            }
                                                        </Badge>
                                                    </h5>

                                                    <h6 className='d-inline-block pr-3'>
                                                        {music.title}

                                                        {` - `}

                                                        {
                                                            music.singers?.map((signer,index) => {
                                                                return (
                                                                    <>
                                                                        <span style={{
                                                                            marginLeft: '4px',
                                                                            display: 'inline-block'
                                                                        }}>{signer.name }</span>
                                                                        {
                                                                            music.singers.length > 1 ? index+1!==music.singers.length ? ` و `:'' :''
                                                                        }
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </h6>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>

                            <div className="col-12 col-lg-8 order-lg-last order-first">
                                <div className="card-body">
                                    <h6 className="card-title">موزیک لیست</h6>

                                    <div className="row align-items-center mt-3 mb-3 mx-0 justify-content-center">
                                        <i onClick={() => nextMusic()}
                                           style={{cursor: 'pointer'}}
                                           id="play-button"
                                           className="material-icons play-pause color-orange ml-2 fa-3x"
                                           aria-hidden="true">skip_next</i>


                                        <div className="col-6 rounded-circle p-1"
                                             style={{border: ' 1px solid #fd7e14', position: 'relative'}}>
                                            <img id="thumbnail" className="img-fluid rounded-circle w-100"
                                                 src={player_image}
                                                 alt=""/>
                                            <div style={{
                                                position: 'absolute',
                                                transform: 'translate(50%, -50%)',
                                                top: '50%',
                                                right: '50%',
                                                width: '50px',
                                                height: '50px',
                                            }}>
                                                {/*<span*/}
                                                {/*onClick={()=>{handlePause()}}*/}
                                                {/*style={{width:'100%',height:'100%',display:'inline-block',cursor:'pointer'}}*/}
                                                {/*className="material-icons fa-4x color-orange">play_circle_outline</span>*/}
                                                {
                                                    loading ?
                                                        <Spinner
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                border: '0.33em solid currentColor',
                                                                borderRightColor: 'transparent'
                                                            }} animation="border" variant="dark"/>
                                                        : ''
                                                }

                                            </div>
                                        </div>

                                        <i onClick={() => prevMusic()}
                                           style={{cursor: 'pointer'}}
                                           id="play-button"
                                           className="material-icons play-pause color-orange mr-2 fa-3x"
                                           aria-hidden="true">skip_previous</i>
                                    </div>

                                    <div className="p-0 m-0" id="now-playing">
                                        <p className=" mb-0">در حال پخش :

                                            {player_title}
                                        </p>
                                        <p className="lead font-weight-bold pt-2" id="title"/>
                                    </div>
                                    <div className="progress-bar progress col-12 mb-3 mt-1"
                                         style={{height: '3px', backgroundColor: '#fd7e14'}}>
                                    </div>
                                    <audio className='w-100' ref={(a) => setPlayer(a)} id="audio-player"
                                           controls="controls"/>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/*<audio ref={(a)=>setPlayer(a)} id="audio-player"  src=""  controls="controls" />*/}
                </section>
            </div>
        </>
    )
}

export default MusicBanner;