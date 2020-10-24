import React from 'react';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Slider from "react-slick";

import slider from '../../style/HorizontalList.module.css';

// One item component
// selected prop will be passed
const MenuItem = ({id, title, image, token, genre,score}) => {
    return (

        <div className={` ${slider.listItem} cart p-2`}>

            <Link as={`/movie/${token}`} href='/movie/[token]'>
                <a style={{width: '100%', height: '100%', position: 'relative', display: 'block'}}>
                    {/*<div className={`card-body p-0 ${slider.itemCover}`}*/}
                    {/*style={{backgroundImage: `url(${process.env.BaseUrl}${image})`}} />*/}
                    <img src={`${process.env.BaseUrl}${image}`} className='' style={{width: '100%'}}/>

                    <div className={` ${slider.itemBody}`}>
                        <div className={`${slider.hvrbox_text}`}>
                            {
                                score!==null?<p className={`border bg-white pt-1 w-75 mx-auto ${slider.hvrbox_score} ${slider.color_orange}`}>
                                    <i className="fas fa-heart mr-1"/>
                                        {score}%
                                </p>:''
                            }

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
    // console.log('list', list);
    return list ? list.map((el , index) => {
        // console.log('el', el);
        let {id, token, title, cover, genre , score} = el;

        return <MenuItem id={id?id:0}
                         title={title?title:'test'}
                         image={cover?cover:'/'}
                         key={token?token:index}
                         token={token?token:'/'}
                         genre={genre?genre:''}
                         score={score}
        />;
        // return <h2>{title}</h2>;
    }):null


};

export default function HorizontalList2({movies, title, showAll, sub = false}) {

    // console.log(movies.length);
    let menu =movies.length>0 ? Menu(movies ? movies : []):<></>;

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

            <Container fluid className='pt-2 mb-3 mb-lg-4'>
                <Row className={slider.rtl}>
                    <div className="col-6 ">
                        <i className='fa fa-film d-inline-block f12'/>
                        <h6 className='d-inline-block pr-2 f11'>{title}</h6>
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

