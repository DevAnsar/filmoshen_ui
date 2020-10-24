import React, {useEffect} from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import movieStyle from '../../style/Movie.module.css';
import {connect} from 'react-redux'

function IndexMovieBanner({slide, imdb_rating, isAuthenticated}) {


    useEffect(() => {

    }, [slide]);


    return (
        <>
            <Container fluid className={`sliderContainer pb-5 ${movieStyle.movie} ${movieStyle.rtl}`}>
                {/*backgroundImage: `url(${process.env.BaseUrl}${slide.image?slide.image:slide.movie.poster})`,*/}
                <img className={`slider-image`}  src={`${process.env.BaseUrl}${slide.image?slide.image:slide.movie.poster}`}/>

                <div className={movieStyle.dark_bg}/>
                <div className="row mt-4 pl-3 " style={{position: 'absolute', bottom: '0',height: '60%', width: '100%',zIndex: '12'}}>


                    <div className=" col-12 text-white " >
                        {
                            slide.name_image ?
                                <div className="row pl-3 mt-4 d-none d-md-block" >
                                    <div className={`col-12`}>
                                        <img className={`sliderNameImage`} src={`${process.env.BaseUrl}${slide.name_image}`} />
                                    </div>
                                </div>
                                :''
                        }


                        <div className="row pl-3 mt-4">
                            <div className={`col-12 pr-5`}style={{position:'absolute',bottom:'75px'}}>
                                <h5 className="text-white">
                                    {slide.description}
                                </h5>
                            </div>
                        </div>


                        <div className="row pl-3 mt-4">
                            <div className={`col-12 pr-5`} style={{position:'absolute',bottom:'30px'}}>
                                {
                                    isAuthenticated ?
                                        <>
                                            <Link href={`/movie/[token]`} as={`/movie/${slide.movie.token}`}>
                                                <a>
                                                    <div
                                                        className="btn  font-md px-3 btn-outline-info btn-lg ">تماشا
                                                    </div>
                                                </a>
                                            </Link>
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
                            </div>

                            {/*<button type="button" className="btn btn-outline-light font-md mr-3">دانلود</button>*/}


                        </div>

                    </div>
                </div>


            </Container>

        </>
    )
}

const mapStateToProps = (state) => (
    {
        isAuthenticated: !!state.authentication.token,
        token: state.authentication.token
    }
);

export default connect(mapStateToProps)(IndexMovieBanner);