import React from 'react';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Slider from "react-slick";

import slider from '../../style/HorizontalList.module.css';

// One item component
// selected prop will be passed
const MenuItem = ({id, title, image, token, singers, view, created_at}) => {
    return (

        <>
            {/*<div className={`menu-item ${slider.menuItem} cart p-0`}>*/}

            {/*<Link as={`/movie/${token}`} href='/movie/[token]'>*/}
            {/*<a>*/}
            {/*<div className={`card-body p-0 ${slider.itemCover}`}*/}
            {/*style={{backgroundImage: `url(${process.env.BaseUrl}${image})`}}></div>*/}

            {/*<div className={` ${slider.itemBody}`}>*/}
            {/*<div className={`${slider.hvrbox_text}`}>*/}
            {/*<p className={`border bg-white pt-1 w-75 mx-auto ${slider.hvrbox_score} ${slider.color_orange}`}>*/}
            {/*<i*/}
            {/*className="fas fa-heart mr-1"></i>88%*/}
            {/*</p>*/}
            {/*<p className="pt-1">{title}</p>*/}
            {/*<p className="pt-1">2020 - وحشت - هیجان انگیز</p>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*</a>*/}
            {/*</Link>*/}
            {/*</div>*/}


            <div className="ag_shop_card_box p-2" key={token}>
                <div className="ag_shop_card_body" style={{background: '#fff'}}>

                    <div className="js-card-bg ag_card_bg">
                        <Link href={`/music/[token]`} as={`/music/${token}`}>
                            <a>
                                <img src={`${process.env.BaseUrl}${image}`} className="img-fluid py-2 px-2"
                                     style={{borderRadius: '12px', width: ' 100%', height: ' 100%'}}/>
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="ag_shop_card_footer p-0" style={{background: '#fff'}}>
                    <Link href={`/music/[token]`} as={`/music/${token}`}>
                        <a>
                            <div className="card-body pt-1">
                                <p className={` text-center font-ms text-dark ${slider.rtl} `}>
                                    {
                                        singers.map((signer,index) => {
                                            return (
                                                <>
                                                    <span style={{
                                                        marginLeft: '4px',
                                                        display: 'inline-block'
                                                    }}>{signer.name }</span>
                                                    {
                                                        singers.length > 1 ? index+1!==singers.length ? ` و `:'' :''
                                                    }
                                                </>
                                            )
                                        })
                                    }
                                </p>
                                <p className="text-center font-ms text-dark">{title}</p>
                            </div>
                        </a>
                    </Link>
                    <div className="card-footer bg-white">
                        <div className="row">
                            <div className=" col-6">
                                <p className="font-ss">
                                    <i className="fas fa-eye mr-1"/>
                                    {
                                        view
                                    }
                                </p>
                            </div>
                            <div className="col-6">
                                <p className="font-ss text-right"><i className="far fa-clock mr-1"/>
                                    {
                                        created_at
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
};

// All items component
// Important! add unique key
export const Menu = list => {
    // console.log(list);
    return list?.map(el => {
        // console.log(el);
        // const {id} = el;
        const {token, title, cover, singers, created_at, viewCount} = el;

        return <MenuItem title={title} singers={singers} image={cover} key={token} token={token} created_at={created_at}
                         view={viewCount}/>;
    });
};

function MusicList({musics, title, showAll, sub = false}) {

    let menu = Menu(musics ? musics : []);


    function NextArrow(props) {
        const {className, style, onClick} = props;
        return (
            <div
                style={{display: 'none'}}
                onClick={onClick}
            />
        );
    }

    function PrevArrow(props) {
        const {className, style, onClick} = props;
        return (
            <div
                style={{display: 'none'}}
                onClick={onClick}
            />
        );
    }

    const settings = {
        slidesToShow: 7,
        slidesToScroll: 0,
        dots: true,
        infinite: false,
        speed: 500,
        rtl: false,
        autoplay: false,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        lazyLoad: true,
        centerMode: false,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 4,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    initialSlide: 0
                }
            },
            {
                breakpoint: 544,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
        ]

    };

    return (
        <>

            <Container fluid className='pt-2 mb-3'>
                <Row className={slider.rtl}>
                    <div className="col-6 ">
                        <i className='fa fa-music d-inline-block f12'/>
                        <h6 className='d-inline-block pr-2 f11'>{title}</h6>
                    </div>
                    <div className="col-6 text-left">
                        {
                            sub ?
                                <Link href={`/tag/m/sub/[category]`} as={`/tag/m/sub/${showAll}`}>
                                    <a className={`${slider.color_orange}`}> مشاهده همه</a>
                                </Link>
                                :
                                <Link href={`/tag/m/[category]`} as={`/tag/m/${showAll}`}>
                                    <a className={`${slider.color_orange}`}> مشاهده همه</a>
                                </Link>
                        }

                    </div>
                </Row>
                <div className={`progress ${slider.rtl}`} style={{height: '2px', backgroundColor: '#d4d5d5'}}>
                    <div className="progress-bar" style={{width: '15%', backgroundColor: '#f25823'}}/>
                </div>

                <Slider {...settings}>
                    {menu}
                </Slider>

            </Container>
        </>
    )
}

export default MusicList;
