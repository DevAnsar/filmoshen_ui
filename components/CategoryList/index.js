import React ,{useEffect} from 'react';
import useSWR, {useSWRPages} from "swr/dist/index";
import fetcher from "../../lib/fetcher";
import useOnScreen from "../../hooks/use-on-screen";
import Container from "react-bootstrap/Container";

import rtl from '../../style/reboot.module.css';
import {MovieCard} from "../movie/MovieCard";
import HorizontalList2 from "./../../components/index/HorizontalList2";


export default function CategoryList({categorySlug}) {



    const {pages, isLoadingMore, loadMore, pageSWRs, pageCount} = useSWRPages(
        `category_movies_${categorySlug}`,
        ({offset, withSWR}) => {
            // console.log('offset', offset);

            const url = offset || process.env.BaseUrl + "/api/site/tag/" + categorySlug;
            let use = useSWR(url, fetcher);
            // console.log('use', use);
            let wSWr = withSWR(use);
            // console.log('wSWr', wSWr);
            const {data} = wSWr;
            // console.log('data', data);
            if (!data) return null;

            const {movies , categories} = data;
            console.log('movies', categories);

            // return null;
            let categoryMovies = movies.data.map(movie => (
                <MovieCard key={movie.token} movie={movie}/>
            ));

            let videoCats = categories.map(result => (
                <HorizontalList2 sub={true} key={result.token} title={result.title} showAll={result.slug}
                                 movies={result.movies}/>
            ));

            return [...videoCats,...categoryMovies];

        },
        SWR => SWR.data.movies.next_page_url,
        []
    );


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
        <>

            <div className={`container-fluid px-0 pb-5 ${rtl.rtl}`} style={{backgroundColor: '#fbfbfd'}}>
                <div className="container-fluid pt-4 px-md-5 px-lg-5 ">
                    <h6 className="mt-3">همه ی سریال های خارجی</h6>

                    <div className="row">
                        {
                            pages
                        }
                    </div>
                </div>

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
        </>
    )
}