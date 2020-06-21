import React, {useState} from 'react';
import movieStyle from '../../style/Movie.module.css';
import reboot from '../../style/reboot.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Link from 'next/link';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';

import ExpansionPanel from 'material-expansion-panel';
import axios from 'axios';

export const Sessions = ({sessions, isAuthenticated}) => {
    const [movie_sessions, setSessions] = useState(sessions);
    var aIcons = [{
        icon: "delete",
        callback: null,
        additionalParams: null
    }];
    var aButtons = [{
        buttonText: "Save",
        callback: null,
        additionalParams: null
    },
        {
            buttonText: "Cancel",
            callback: null,
            additionalParams: null,
            toggleExpand: true
        }];

    function handleAddBookmark(token) {
        console.log(token);

        axios.get(`/api/addBookmark/${token}`)
            .then(res => {
                console.log('data', res.data.status);
                if (res.data.status) {
                    console.log('jjjjj');

                    setSessions(prevState => {
                        let Sessions = prevState.map(session => {
                            let Session = session;
                            let episodes=Session.episodes.map(episode => {
                                if (episode.token === token) {
                                    console.log('token', episode.token);
                                    return {
                                        ...episode,
                                        bookmark: true
                                    }
                                }
                                else return [...episode];
                            });
                            return {
                                ...Session,
                                'episodes':episodes
                            }
                        });
                        return Sessions;
                    })
                }
            })
            .catch(err => console.log(err))
    }

    function handleRemoveBookmark(token) {
        console.log(token);

        axios.get(`/api/removeBookmark/${token}`)
            .then(res => {
                console.log('data', res.data.status);
                if (res.data.status) {
                    console.log('jjjjj');

                    setSessions(prevState => {
                        let Sessions = prevState.map(session => {
                            let Session = session;
                            let episodes=Session.episodes.map(episode => {
                                if (episode.token === token) {
                                    console.log('token', episode.token);
                                    return {
                                        ...episode,
                                        bookmark: false
                                    }
                                }
                                else return [...episode];
                            });
                            return {
                                ...Session,
                                'episodes':episodes
                            }
                        });
                        return Sessions;
                    })
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container-fluid px-md-5 px-lg-5 pt-5 mt-3">

            <Tabs>
                <TabList>
                    {
                        movie_sessions?.map(session => {
                            return (
                                <Tab key={session.id}>

                                    <div className="nav-link   active web color-orange f8">
                                        {session.title}
                                    </div>

                                </Tab>
                            )
                        })
                    }
                </TabList>

                {
                    movie_sessions?.map(session => {
                        return (
                            <TabPanel>
                                {
                                    session.episodes?.map(episode => {
                                        return (

                                            <>
                                                <div className='container'>


                                                    <ExpansionPanel className={reboot.rtl} titleIcon="done_all"
                                                                    expandedTitle={`${episode.title}`}
                                                                    title={`${episode.title}`}
                                                    >
                                                        <div className="row pb-2">
                                                            <div className="col-12 col-md-2 mt-2">
                                                                <Link href={`/movie/[token]`}
                                                                      as={`/movie/${episode.token}`}>
                                                                    <a>
                                                                        <img
                                                                            src={`${process.env.BaseUrl}${episode.cover}`}
                                                                            className="img-fluid"/>
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                            <div className="col-12 col-md-10 mt-2">
                                                                <p className="text-justify pt-2 f7">
                                                                    {episode.story}
                                                                </p>

                                                                {
                                                                    isAuthenticated ?
                                                                        <Link href={`/movie/[token]`}
                                                                              as={`/movie/${episode.token}`}>
                                                                            <a>
                                                                                <button type="button"
                                                                                        className="btn btn-success font-md mt-3 f7">
                                                                                    تماشا
                                                                                </button>
                                                                            </a>
                                                                        </Link>
                                                                        :
                                                                        <Link href={`/login`}>
                                                                            <a>
                                                                                <button type="button"
                                                                                        className="btn btn-warning font-md mt-3 f7">
                                                                                    ورود و تماشا
                                                                                </button>
                                                                            </a>
                                                                        </Link>
                                                                }

                                                                {
                                                                    episode.bookmark ?
                                                                        <button type="button"
                                                                                onClick={() => handleRemoveBookmark(episode.token)}
                                                                                className="btn btn-success font-md mr-3 mt-3 f7">نشان
                                                                            شده
                                                                        </button>
                                                                        :

                                                                        <button type="button"
                                                                                onClick={() => handleAddBookmark(episode.token)}
                                                                                className="btn btn-light font-md mr-3 mt-3 f7">نشان
                                                                            کردن
                                                                        </button>

                                                                }

                                                                <button type="button"
                                                                        className="btn btn-outline-red  font-md ml-3 mt-3">
                                                                    <i className="far fa-bookmark text-center "/>
                                                                </button>

                                                            </div>
                                                        </div>
                                                    </ExpansionPanel>

                                                </div>
                                            </>

                                        )
                                    })//end episode
                                }
                            </TabPanel>
                        )
                    })
                }

            </Tabs>
        </div>
    )

};


export const Story = (title, story, about) => {
    return (
        <Container fluid className="px-md-5 px-lg-5 pt-4">
            <div className="row">
                {/*<div className="col-12 col-lg-4 mt-3">*/}
                    {/*<img src="img/810.jpg" className="img-fluid" style={{width: '100%'}}/>*/}
                    {/*<div className="back"/>*/}
                    {/*<div className="icon"><i className="fas fa-play pt-3 "/></div>*/}
                    {/*<div className="icon1 text-center">*/}
                        {/*<p className="font-ms py-2 px-3">24 عکس</p>*/}
                    {/*</div>*/}
                {/*</div>*/}
                <div className="col-12 col-lg-8 mt-3">
                    {/*<h6>داستان فیلم شنل قرمزی</h6>*/}
                    <p className="text-justify pt-2">
                        {/*لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و*/}
                        {/*با استفاده از*/}
                        {/*طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و*/}
                        {/*برای شرایط*/}
                        {/*فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای*/}
                        {/*زیادی در*/}
                        {/*شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم*/}
                        {/*افزارها شناخت*/}
                        {/*بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی*/}
                        {/*ایجاد کرد. در*/}
                        {/*این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به*/}
                        {/*پایان رسد و*/}
                        {/*زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود*/}
                        {/*طراحی اساسا*/}
                        {/*مورد استفاده قرار گیرد.*/}
                    </p>
                </div>
            </div>

            <h6 className="mt-5 pt-4">
                {`درباره ی فیلم `}

                {title}
            </h6>
            <p className="text-justify pt-2">
                {about}
            </p>

            <h6 className="mt-5 pt-4">
                {`داستان فیلم `}

                {title}
            </h6>
            <p className="text-justify pt-2">
                {story}
            </p>
        </Container>
    )
}
export const Actors = ({actors, movie_title}) => {
    return (
        <Container fluid className="px-md-5 px-lg-5 pt-5">

            <Row className=" mt-4">

                <div className="col-12">
                    {`بازیگران فیلم `}
                    {movie_title}
                </div>
                {console.log(actors)}
                {
                    typeof(actors) == null ? '' :
                        actors.map(actor => {
                            return (
                                <div key={actor.id} className="col-6 col-md-3 col-lg-2 mt-3">
                                    <Link href='/crew/[slug]' as={`/crew/${actor.slug}`}>
                                        <a>
                                            <img src={`${process.env.BaseUrl}${actor.avatar}`}
                                                 className={`img-fluid d-block mx-auto ${movieStyle.img_actor}`}/>
                                            <p className="text-center font-s mt-2">{actor.name}</p>
                                            {/*<p className="text-center font-ms mt-1 text-secondary">بازیگر</p>*/}
                                        </a>
                                    </Link>
                                </div>
                            )
                        })

                }
            </Row>
        </Container>
    )
};
export const Factors = ({factors, movie_title}) => {
    return (
        <Container fluid className="px-md-5 px-lg-5 pt-5">

            <Row className=" mt-4">

                <div className="col-12">
                    {`سایر عوامل فیلم `}
                    {movie_title}
                </div>

                <div className="col-12 mt-3 ">
                    <div className="row justify-content-center">
                        <div className='col-11'>

                            <ul className="crew-list clearfix">
                                <li className={`${movieStyle.crew_item}`}>
                                    <h3 className={`${movieStyle.crew_title}`}>کارگردان</h3>
                                    <ul className="crew-names-list">
                                        {
                                            factors['directors']?.map(crew => {
                                                return (
                                                    <li key={crew.id} className={movieStyle.crew_names}>
                                                        <Link href='/crew/[slug]' as={`/crew/${crew.slug}`}>
                                                            <a title={crew.name}
                                                               className={movieStyle.crew_name}>{crew.main_name}
                                                            </a>
                                                        </Link>
                                                    </li>
                                                )
                                            })

                                        }
                                    </ul>
                                </li>


                                <li className={`${movieStyle.crew_item}`}>
                                    <h3 className={`${movieStyle.crew_title}`}>تهیه کنندگان</h3>
                                    <ul className="crew-names-list">
                                        {
                                            factors['producers']?.map(crew => {
                                                return (
                                                    <li key={crew.id} className={movieStyle.crew_names}>
                                                        <Link href='/crew/[slug]' as={`/crew/${crew.slug}`}>
                                                            <a title={crew.name}
                                                               className={movieStyle.crew_name}>{crew.main_name}
                                                            </a>
                                                        </Link>
                                                    </li>
                                                )
                                            })

                                        }
                                    </ul>
                                </li>


                                <li className={`${movieStyle.crew_item}`}>
                                    <h3 className={`${movieStyle.crew_title}`}>نویسنده</h3>
                                    <ul className="crew-names-list">
                                        {
                                            factors['writers']?.map(crew => {
                                                return (
                                                    <li key={crew.id} className={movieStyle.crew_names}>
                                                        <Link href='/crew/[slug]' as={`/crew/${crew.slug}`}>
                                                            <a title={crew.name}
                                                               className={movieStyle.crew_name}>
                                                                {crew.main_name}
                                                            </a>
                                                        </Link>
                                                    </li>
                                                )
                                            })

                                        }
                                    </ul>
                                </li>

                                <li className={`${movieStyle.crew_item}`}>
                                    <h3 className={`${movieStyle.crew_title}`}>آهنگساز</h3>
                                    <ul className="crew-names-list">
                                        {
                                            factors['composers']?.map(crew => {
                                                return (
                                                    <li key={crew.id} className={movieStyle.crew_names}>
                                                        <Link href='/crew/[slug]' as={`/crew/${crew.slug}`}>
                                                            <a title={crew.name}
                                                               className={movieStyle.crew_name}>{crew.main_name}
                                                            </a>
                                                        </Link>
                                                    </li>
                                                )
                                            })

                                        }
                                    </ul>
                                </li>

                                <li className={`${movieStyle.crew_item}`}>
                                    <h3 className={`${movieStyle.crew_title}`}>مدیر فیلمبدار</h3>
                                    <ul className="crew-names-list">
                                        {
                                            factors['photography']?.map(crew => {
                                                return (
                                                    <li key={crew.id} className={movieStyle.crew_names}>
                                                        <Link href='/crew/[slug]' as={`/crew/${crew.slug}`}>
                                                            <a title={crew.name}
                                                               className={movieStyle.crew_name}>
                                                                {crew.main_name}
                                                            </a>
                                                        </Link>
                                                    </li>
                                                )
                                            })

                                        }
                                    </ul>
                                </li>


                            </ul>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    )
};