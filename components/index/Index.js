import React from 'react';
import Container from 'react-bootstrap/Container';
import useSWR, {useSWRPages} from "swr";
import fetcher from "../../lib/fetcher";

import useOnScreen from "../../hooks/useOnScreen";
import HorizontalList2 from "./HorizontalList2";
import MusicList from "./MusicList";

import IndexSlider from "./IndexSlider";


import {connect} from 'react-redux';
import initialize from './../../utils/initialize';
import MovieSolidBanner from "../movie/MovieSolidBanner";
import MusicBanner from "../music/MusicBanner";


function Index() {

    const {pages, isLoadingMore, loadMore, pageSWRs, pageCount} = useSWRPages(
        "movies",
        ({offset, withSWR}) => {
            // console.log('offset',offset);

            const url = offset || process.env.BaseUrl + "/api/site/index";
            let use = useSWR(url, fetcher);
            // console.log('use', use);
            let wSWr = withSWR(use);
            // console.log('wSWr', wSWr);
            const {data} = wSWr;
            // console.log('data', data);
            if (!data) return null;

            const {categories, m_categories, movieBanner, musicBanner} = data;
            // console.log('categories', categories);


            let videoCats = categories?.data?.map((result, index) => (
                <HorizontalList2 key={result.token + index} title={result.title} showAll={result.slug}
                                 movies={result.movies}/>
            ));


            let musicCats = m_categories?.data?.map(music => (
                    <MusicList key={music.token} title={music.title} showAll={music.slug} musics={music.musics}/>
                )
            );

            let MovieBanner = movieBanner ? <MovieSolidBanner movie={movieBanner.movie}
                                                              actors={movieBanner.actors}/> : null;


            let MusicSolidBanner = musicBanner ? <MusicBanner title={musicBanner.title} musics={musicBanner.musics}  /> : null;

            let pages = [...videoCats, ...musicCats, MovieBanner ,MusicSolidBanner];
            // console.log('pages', MovieBanner);
            return pages;
        },
        SWR => SWR.data.m_categories.next_page_url != null
            ? SWR.data.m_categories.next_page_url : SWR.data.categories.next_page_url,
        []
    );
    // console.log(pageSWRs, pageCount);

    const $loadMoreButton = React.useRef(null);
    const isOnScreen = useOnScreen($loadMoreButton, "200px");

    React.useEffect(() => {
        if (isOnScreen) loadMore();
    }, [isOnScreen]);


    return (
        <div className='pb-5' style={{backgroundColor: '#fbfbfd'}}>

            <IndexSlider/>

            {
                pages
            }

            <Container>
                <div className='row justify-content-center my-5' ref={$loadMoreButton}>
                    {
                        isLoadingMore ? 'در حال دریافت...' : ''
                    }
                </div>
            </Container>
        </div>
    )
}

Index.getInitialProps = function (ctx) {
    initialize(ctx);
};

export default connect(state => state)(Index);