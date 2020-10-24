import React,{useState} from 'react';
import useSWR, {useSWRPages} from "swr";
import fetcher from "./../../../lib/fetcher";
import useOnScreen from "../../../hooks/useOnScreen";
import Container from "react-bootstrap/Container";

import rtl from './../../../style/reboot.module.css';
import {MusicCard} from "../../music/MusicCard";
import MusicList from "../../index/MusicList";

export default function CategoryList({categorySlug}) {
    const [cat_title,setCatTitle]=useState('');
    const {pages, isLoadingMore, loadMore, pageSWRs, pageCount} = useSWRPages(
        `category_musics_${categorySlug}`,
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

            const {musics,categories,cat_title} = data;
            setCatTitle(cat_title);
            // console.log('musics',musics);
            // return null;

            let musicCats = categories.map(music => (
                    <MusicList sub={true} key={music.token} title={music.title} showAll={music.slug} musics={music.musics}/>
                )
            );

            let categoryMusic = musics.data.map(music => (
                <MusicCard key={music.id} music={music}/>
            ));

            console.log('categoryMusic',categoryMusic);
            return [...musicCats,...categoryMusic]


        },
        SWR => SWR.data.musics.next_page_url,
        [categorySlug]
    );

    const $loadMoreButton = React.useRef(null);
    const isOnScreen = useOnScreen($loadMoreButton, "200px");

    React.useEffect(() => {
        if (isOnScreen) loadMore();
    }, [isOnScreen]);


    return (
        <>

            <div className={`container-fluid px-0 pb-5 ${rtl.rtl}`} style={{backgroundColor: '#fbfbfd'}}>
                <div className="container-fluid pt-4 px-md-5 px-lg-5 ">
                    <h6 className="mt-3">
                        آهنگ ها
                    </h6>
                    <h6 className="mt-3">
                        دسته:
                        {
                            cat_title
                        }
                    </h6>

                    <div className="row">
                        {
                            pages
                        }
                    </div>
                </div>

                <Container>
                    <div className='row justify-content-center my-5' ref={$loadMoreButton} >
                        {
                            isLoadingMore ? 'در حال دریافت...' : ''
                        }
                    </div>
                </Container>
            </div>
        </>
    )
}