import React, {useEffect, useState} from 'react';
import axios from 'axios';
import reboot from './../../style/reboot.module.css';
import {MovieCard} from "../movie/MovieCard";
import {MusicCard} from "../music/MusicCard";

function CrewPage({crew_slug}) {

    const [crew, setCrew] = useState();
    const [movies, setMovies] = useState();
    const [musics, setMusics] = useState();

    useEffect(() => {
        async function fetchData() {
            await axios.get(`${process.env.BaseUrl}/api/v1/crew/${crew_slug}`)
                .then(res => {

                    setCrew(res.data.crew);
                    setMovies(res.data.movies);
                    setMusics(res.data.musics);
                })
                .catch(err => console.log(err))
        }

        fetchData();

    }, [crew_slug]);
    return (
        <div className={`container-fluid p-0 ${reboot.rtl}`}>
            <div className='container-fluid p-0 crew-info-banner py-5'>
                <div className="container inner-wrapper">
                    <div className='row'>
                        <div className="col-md-4 col-12">

                            <div className="crew-pic">
                                <div className="ds-media ds-media--ratio-square  ds-thumb_media">
                                    <img className="ds-media_image"
                                         src={`${process.env.BaseUrl}${crew ? crew.avatar : '/img/null_user.png'}`}
                                         alt='' title={crew? crew.main_name :'...'}/>
                                </div>
                            </div>

                            <div className="crew-name-birth pr-4">
                                <h1>
                                    <div className="name-fa f12">
                                        {
                                            crew? crew.main_name :'...'
                                        }
                                    </div>
                                </h1>
                                <div className="crew-birth">
                                    {` متولد `}
                                    {
                                        crew? crew.birth :'...'
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8 col-12 text-justify mt-3 mt-md-0">
                            <p className="" dangerouslySetInnerHTML={{__html:  crew? crew.description :'...' }}/>

                        </div>
                    </div>
                </div>
            </div>

            <div className='container-fluid'>
                <div className="container">
                    {
                        movies?.length > 0 ?
                        <>
                            <div className='row'>
                                <div className='col-12'>
                                    {` فیلم های `}

                                    {
                                        crew?.main_name
                                    }
                                </div>
                            </div>
                            <div className='row' style={{minHeight:'300px'}}>
                                {
                                    movies?
                                        <>
                                            {
                                                movies.map(movie=>{
                                                    return  <MovieCard key={movie.token} movie={movie} />
                                                })
                                            }
                                        </>
                                        :
                                        <h6 className='col-12 my-3 pb-5'>
                                            در حال دریافت...
                                        </h6>
                                }
                            </div>
                        </>
                        :
                        <></>
                    }

                    {
                        musics?.length > 0 ?
                        <>
                            <div className='row'>
                                <div className='col-12'>
                                    {` موزیک های `}

                                    {
                                        crew?.main_name
                                    }
                                </div>
                            </div>
                            <div className='row' style={{minHeight:'300px'}}>
                                {
                                    musics?
                                        <>
                                            {
                                                musics.map(music=>{
                                                    return  <MusicCard key={music.token} music={music} />
                                                })
                                            }
                                        </>
                                        :
                                        <h6 className='col-12 my-3 pb-5'>
                                            در حال دریافت...
                                        </h6>
                                }
                            </div>
                        </>
                        :
                        <></>
                    }

                </div>
            </div>


        </div>
    )
}

export default CrewPage;