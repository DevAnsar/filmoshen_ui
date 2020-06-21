import React  from 'react';
import movieStyle from '../../style/Movie.module.css';
import Container from 'react-bootstrap/Container';

import MovieBanner from './MovieBanner';
import Comments from "./Comments";
import Head from 'next/head';

import {Story ,Actors , Factors ,Sessions} from './MovieOptions'
import {connect} from 'react-redux';

function Movie({movie, actors, factors,bookmark,isAuthenticated,comments,movie_type,movie_access}) {

    console.log('movie',movie);
    let story = Story(movie.title, movie.story, movie.about);

    return (
        <>
            <Head>
                <title>
                    {process.env.AppName}
                    -
                    {movie.title}
                </title>
            </Head>



            <MovieBanner movie={movie}
                         actors={actors}
                         // imdb_rating={imdb?.Ratings? imdb?.Ratings[0]?.Value : ''}
                         // rotten_tomatoes_rating={imdb?.Ratings ? imdb?.Ratings[1]?.Value : ''}
                         bookmark={bookmark}
                         movie_access={movie_access}
            />

            {/*{*/}
                {/*isAuthenticated ?*/}
                    {/*( movie_access &&(*/}
                        {/*<Container className='p-5'>*/}
                            {/*<div className={`row ${player._window}`} >*/}
                                {/*<PlayerPage url={'https://web2020.arvanvod.com/1v959pd7ex/2Rrq4dqYPv/h_,144_200,240_400,360_612,k.mp4.list/master.m3u8'} />*/}
                            {/*</div>*/}
                        {/*</Container>*/}
                    {/*)||*/}
                        {/*<Container className='p-5'>*/}
                            {/*<div className="row justify-content-center">*/}
                                {/*<div className='alert alert-warning'>*/}
                                    {/*<Link href={'/packagelist'}>*/}
                                        {/*<a>*/}
                                            {/*برای مشاهده ی ویدیوها باید اشتراک تهیه کنید.*/}
                                        {/*</a>*/}
                                    {/*</Link>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</Container>*/}
                    {/*)*/}
                    {/*:''*/}
            {/*}*/}


            <Container fluid className={`px-0 ${movieStyle.rtl}`} style={{backgroundColor: '#fbfbfd'}}>

                {story}
                {
                    movie.type==='serial' ?
                        <Sessions sessions={movie.sessions} isAuthenticated={isAuthenticated} />
                        : ''
                }
                <Actors actors={actors} movie_title={movie.title}/>

                <Factors factors={factors}/>

                <Comments movie={movie} isAuthenticated={isAuthenticated} movie_type={movie_type}  comments={comments}  />
            </Container>
        </>
    )
}
const mapStateToProps = (state) => (
    {
        isAuthenticated: !!state.authentication.token,
    }
);
export default connect(mapStateToProps)(Movie);