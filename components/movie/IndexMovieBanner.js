import React, {useEffect} from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import movieStyle from '../../style/Movie.module.css';
import {connect} from 'react-redux'

function IndexMovieBanner({movie, imdb_rating, isAuthenticated, token, movie_access, actors}) {


    useEffect(() => {

    }, [movie]);


    return (
        <>
            <Container fluid className={` pb-5 ${movieStyle.movie} ${movieStyle.rtl}`}
                       style={{backgroundImage: `url(${process.env.BaseUrl}${movie.poster})`, minHeight: '300px'}}>


                <div className={movieStyle.dark_bg}/>
                <div className="row mt-4 pl-3 ">
                    <div className="col-md-3 text-center">
                        <img src={`${process.env.BaseUrl}${movie.cover}`} className={movieStyle.movie_cover}/>
                    </div>

                    <div className=" col-md-9 text-white" style={{zIndex: '12', position: 'relative', bottom: '0%'}}>
                        <div className="row pl-3 mt-4">
                            <h5 className="text-white">
                                {movie.title}
                            </h5>
                        </div>


                        <div className="row pl-3 mt-4">
                            {
                                isAuthenticated ?
                                    <>
                                        <Link href={`/movie/[token]`} as={`/movie/${movie.token}`}>
                                            <a>
                                                <div
                                                    className="btn  font-md px-3 btn-outline-info btn-sm ">تماشا
                                                </div>
                                            </a>
                                        </Link>
                                    </>
                                    :
                                    <>
                                        <Link href={`/login`}>
                                            <a>
                                                <button type="button" className="btn btn-warning font-md">ورود و تماشا
                                                </button>
                                            </a>
                                        </Link>
                                    </>
                            }

                            {/*<button type="button" className="btn btn-outline-light font-md mr-3">دانلود</button>*/}


                        </div>

                        {/*< div className="row pl-3 mt-4">*/}
                        {/*<p className="font-s"> ستارگان :*/}
                        {/*{*/}
                        {/*actors?.map(actor => {*/}
                        {/*return (*/}
                        {/*<span style={{display: 'inline-flex'}} key={actor.id} className="mx-2">*/}
                        {/*<Link href='/crew/[slug]' as={`/crew/${actor.slug}`}>*/}
                        {/*<a>*/}
                        {/*{actor.name}*/}
                        {/*</a>*/}
                        {/*</Link>*/}
                        {/*</span>*/}
                        {/*)*/}
                        {/*})*/}
                        {/*}*/}
                        {/*</p>*/}
                        {/*</div>*/}

                        <div className="row pl-3 mt-4">

                            {/*{*/}
                            {/*movie.age ?*/}
                            {/*<>*/}
                            {/*<span className="badge badge-warning ">*/}
                            {/*<img src={`${process.env.BaseUrl}${movie.age?.icon}`}*/}
                            {/*className={`${movieStyle.ageIcon}`}/>*/}
                            {/*</span>*/}
                            {/*< span className={` mr-2 ${movieStyle.font_ms} `}>*/}
                            {/*{movie.age?.title}*/}
                            {/*</span>*/}
                            {/*</>*/}
                            {/*: ''*/}
                            {/*}*/}


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