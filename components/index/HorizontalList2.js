import React from 'react';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Slider from "react-slick";

import slider from '../../style/HorizontalList.module.css';

// One item component
// selected prop will be passed
const MenuItem = ({id, title, image, token,genre}) => {
    return (

        <div className={`menu-item ${slider.menuItem} cart p-0`}>

            <Link as={`/movie/${token}`} href='/movie/[token]'>
                <a>
                    <div className={`card-body p-0 ${slider.itemCover}`}
                         style={{backgroundImage: `url(${process.env.BaseUrl}${image})`}} />

                    <div className={` ${slider.itemBody}`}>
                        <div className={`${slider.hvrbox_text}`}>
                            <p className={`border bg-white pt-1 w-75 mx-auto ${slider.hvrbox_score} ${slider.color_orange}`}>
                                <i className="fas fa-heart mr-1" />
                                88%
                            </p>
                            <p className="pt-1">{title}</p>
                            <p className="pt-1">{genre}</p>
                        </div>
                    </div>
                </a>
            </Link>
        </div>

    );
};

// All items component
// Important! add unique key
export const Menu = list => {
    console.log(list);
    return list?.map(el => {
        // console.log(el);
        const {id,token,title,cover,genre} = el;

        return <MenuItem id={id} title={title} image={cover} key={token} token={token} genre={genre}/>;
    });
};

export default function HorizontalList2({movies, title ,showAll,sub=false}) {

    let menu = Menu(movies ? movies : []);


    const settings = {
        slidesToShow: 7,
        slidesToScroll: 4,
        dots: false,
        infinite: false,
        speed: 500,
        rtl: false,
        autoplay: false,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        lazyLoad: true,
        centerMode: true,
        responsive: [
            {
                breakpoint: 1044,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 0
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 321,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>

            <Container fluid className='pt-2'>
                <Row className={slider.rtl}>
                    <div className="col-6 ">
                        <h6>{title}</h6>
                    </div>
                    <div className="col-6 text-left">
                        {
                            sub ?
                                <Link href={`/tag/sub/[category]`} as={`/tag/sub/${showAll}`}>
                                    <a className={`${slider.color_orange}`}> مشاهده همه</a>
                                </Link>
                                :
                                <Link href={`/tag/[category]`} as={`/tag/${showAll}`}>
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

