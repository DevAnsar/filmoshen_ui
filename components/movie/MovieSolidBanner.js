import React from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import movieStyle from '../../style/Movie.module.css';


function MovieSolidBanner({movie, actors}) {


    return (
        <>
            <Container fluid className={`my-5 pb-5 ${movieStyle.movie} ${movieStyle.rtl}`}
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
                                <Link href={`/movie/[token]`} as={`/movie/${movie.token}`}>
                                    <a>
                                        <div
                                            className="btn btn-success font-md">تماشا
                                        </div>
                                    </a>
                                </Link>

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


                        </div>


                    </div>
                </div>


            </Container>

        </>
    )
}


export default MovieSolidBanner;