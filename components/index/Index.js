import React from 'react';
import Container from 'react-bootstrap/Container';
import useSWR, {useSWRPages} from "swr";
import fetcher from "../../lib/fetcher";

import useOnScreen from "../../hooks/use-on-screen";
import HorizontalList2 from "./HorizontalList2";
import MusicList from "./MusicList";

import IndexSlider from "./IndexSlider";


import {connect} from 'react-redux';
import initialize from './../../utils/initialize';

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
            console.log('data', data);
            if (!data) return null;

            const {categories, m_categories} = data;
            console.log('categories', categories);


            let videoCats = categories.data.map(result => (
                <HorizontalList2  key={result.token} title={result.title} showAll={result.slug}
                                 movies={result.movies}/>
            ));
            console.log('videoCats', videoCats);
            let musicCats = m_categories.data.map(music => (
                    <MusicList key={music.token} title={music.title} showAll={music.slug} musics={music.musics}/>
                )
            );
            console.log('musicCats', musicCats);
            return [...videoCats, ...musicCats]
            //
            // return (
            //     <>
            //         <Cats/>
            //         <musicCats/>
            //     </>
            // )

        },
        SWR => SWR.data.m_categories.next_page_url != null
            ? SWR.data.m_categories.next_page_url : SWR.data.categories.next_page_url,
        []
    );
    // console.log(pageSWRs, pageCount);

    const [infiniteScrollEnabled, setInfiniteScrollEnabled] = React.useState(
        false
    );
    const $loadMoreButton = React.useRef(null);
    const infiniteScrollCount = React.useRef(0);
    const isOnScreen = useOnScreen($loadMoreButton, "200px");

    React.useEffect(() => {
        if (!infiniteScrollEnabled || !isOnScreen) return;

        loadMore();

        const count = infiniteScrollCount.current;

        if (count + 1 === 3) {
            setInfiniteScrollEnabled(false);
            infiniteScrollCount.current = 0;
        } else {
            infiniteScrollCount.current = count + 1;
        }
    }, [infiniteScrollEnabled, isOnScreen]);


    return (
        <div className='pb-5' style={{backgroundColor: '#fbfbfd'}}>

            <IndexSlider/>
            {
                pages
            }


            <Container>
                <div className='row justify-content-center my-5'>
                    <button
                        ref={$loadMoreButton}
                        className="col-xl-2 col-md-6 col-6 btn btn-warning  py-2 px-4"
                        disabled={isLoadingMore}
                        onClick={() => {
                            loadMore();
                            setInfiniteScrollEnabled(true);
                        }}
                    >
                        نمایش بیشتر
                    </button>
                </div>
            </Container>
        </div>
    )
}

Index.getInitialProps = function (ctx) {
    initialize(ctx);
};

export default connect(state => state)(Index);