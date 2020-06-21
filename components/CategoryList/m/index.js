import React from 'react';
import useSWR, {useSWRPages} from "swr";
import fetcher from "./../../../lib/fetcher";
import useOnScreen from "../../../hooks/use-on-screen";
import Container from "react-bootstrap/Container";

import rtl from './../../../style/reboot.module.css';
import {MusicCard} from "../../music/MusicCard";



export default function CategoryList({categorySlug}) {
    const {pages, isLoadingMore, loadMore, pageSWRs, pageCount} = useSWRPages(
        `category-musics-${categorySlug}`,
        ({offset, withSWR}) => {
            // console.log('offset', offset);

            const url = offset || process.env.BaseUrl + "/api/site/tag/m/" + categorySlug;
            let use = useSWR(url, fetcher);
            // console.log('use', use);
            let wSWr = withSWR(use);
            // console.log('wSWr', wSWr);
            const {data} = wSWr;
            // console.log('data', data);
            if (!data) return null;

            const {musics} = data;
            // console.log('movies', movies);

            // return null;
            let Musics = musics.data.map(music => (
                <MusicCard key={music.id} music={music}/>
            ));
            return Musics;

        },
        SWR => SWR.data.musics.next_page_url,
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
                    <h6 className="mt-3">
                        آهنگ ها
                    </h6>

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