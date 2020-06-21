import React from 'react';
import useSWR, {useSWRPages} from "swr/dist/index";
import useOnScreen from "../../hooks/use-on-screen";
import fetcher from "../../lib/fetcher";
import rtl from '../../style/reboot.module.css';
import Link from 'next/link';
// import sideBar from './sideBar';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function Index() {

    const {pages, isLoadingMore, loadMore, pageSWRs, pageCount} = useSWRPages(
        `blog`,
        ({offset, withSWR}) => {
            // console.log('offset', offset);

            const url = offset || process.env.BaseUrl + "/api/v1/blog";
            let use = useSWR(url, fetcher);
            // console.log('use', use);
            let wSWr = withSWR(use);
            // console.log('wSWr', wSWr);
            const {data} = wSWr;
            // console.log('data', data);
            if (!data) return null;

            const {posts} = data;
            console.log('posts', posts);

            // return null;
            let blogPosts = posts.data.map(post => (
                <PostCard key={post.token} post={post}/>
            ));
            return blogPosts;

        },
        SWR => SWR.data.posts.next_page_url,
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


    const PostCard = ({post}) => {


        return (
            <>
                <div className="row py-2">
                    <div className="col-12 col-md-12">
                        <div className="row pb-2 ">

                            <div className="col-12 col-md-3 pt-4">
                                <Link href={'/blog/[token]'} as={`/blog/${post.token}`}>
                                    <a >
                                        <img src={`${process.env.BaseUrl}${post.cover}`} className="img-fluid"/>
                                    </a>
                                </Link>
                            </div>

                            <div className="col-12 col-md-9 pt-4">
                                <Link href={`/blog/[token]`} as={`/blog/${post.token}`}>
                                    <a>
                                        <h5 className="text-dark">
                                            {post.title}
                                        </h5>
                                    </a>
                                </Link>
                                <p className="font text-secondary font-s">
                                        <span>
                                            <i className="fa fa-clock mt-2 mx-1 text-secondary"/>
                                            {
                                                post.created_at
                                            }
                                        </span>
                                </p>

                                <p className="font-md text-justify pt-2" style={{lineHeight: '2'}}>
                                    {
                                        post.description
                                    }

                                    <Link href={`/blog/[token]`} as={`/blog/${post.token}`}>
                                        <a>
                                            <span className="color-orange ml-1">بیشتر</span>
                                        </a>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="progress my-2" style={{height: '1px'}}>
                    <div className="progress-bar"/>
                </div>
            </>
        )
    };

    return (
        <>

            <div className={`container-fluid px-lg-5 px-md-5 pt-4 pb-4 ${rtl.rtl}`}>
                <div className={`row  justify-content-between pt-4 mx-0 `}>
                    <div className="col-12  col-lg-8 border bg-white rounded mt-2">

                        {
                            pages
                        }

                        <div className='container'>
                            <div className='row justify-content-center my-5'>
                                <button
                                    ref={$loadMoreButton}
                                    className="col-xl-2 col-md-6 col-6 btn btn-light  py-2 px-4"
                                    disabled={isLoadingMore}
                                    onClick={() => {
                                        loadMore();
                                        setInfiniteScrollEnabled(true);
                                    }}
                                >
                                    نمایش بیشتر

                                </button>
                            </div>
                        </div>

                    </div>

                    <div className="col-12 col-lg-4 rounded pl-lg-0 bor-weblog mt-2" style={{height: '100%'}}>
                        <div className="container border bg-white rounded pt-2 pb-5">


                           {/*<sideBar />*/}

                            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">

                                <Tab eventKey="profile" title="پربازدیدها">

                                    <>

                                        <div className="row">
                                            <div className="col-12 col-md-12">
                                                <div className="row pt-2">
                                                    <div className="col-7">
                                                        <a href="#">
                                                            <p className="text-justify text-dark"
                                                               style={{lineHeight: '1.5'}}>
                                                                لیست کامل استخرهای شمال
                                                                تهران + آدرس، قیمت و تخفیف بلیط استخر شمال تهران
                                                            </p>
                                                        </a>
                                                        <p className="font text-secondary font-ss pt-1">
                                                            <i className="fa fa-clock mx-1 text-secondary"/>
                                                            >شنبه 27 مهر
                                                        </p>
                                                    </div>
                                                    <div className="col-5">
                                                        <a href="#">
                                                            <img src="img/201.jpg"
                                                                 className="img-weblog img-fluid d-block mx-auto"/>
                                                        </a>
                                                    </div>
                                                </div>
                                                {/*//*/}
                                            </div>
                                        </div>

                                    </>
                                </Tab>
                                <Tab eventKey="contact" title="تازه ها">

                                    <>

                                        <div className="row pt-2">
                                            <div className="col-7">
                                                <a href="#">
                                                    <p className="text-justify text-dark"
                                                       style={{lineHeight: '1.5'}}>لیست
                                                        کامل استخرهای شمال تهران + آدرس، قیمت و تخفیف بلیط استخر
                                                        شمال
                                                        تهران</p>
                                                </a>
                                                <p className="font text-secondary font-ss pt-1">
                                                    <i className="fa fa-clock mx-1 text-secondary"/>
                                                    شنبه 27 مهر
                                                </p>
                                            </div>
                                            <div className="col-5">
                                                <a href="#">
                                                    <img src="img/201.jpg"
                                                         className="img-weblog img-fluid d-block mx-auto"/>
                                                </a>
                                            </div>
                                        </div>

                                    </>
                                </Tab>
                            </Tabs>


                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Index;