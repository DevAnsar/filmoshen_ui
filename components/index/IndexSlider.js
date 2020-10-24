import React, {useEffect} from 'react';
import Slider from "react-slick";
import fetcher from "../../lib/fetcher";
import useSWR from "swr";
import indexSliderStyle from './IndexSlider.module.css';
import IndexMovieBanner from '../movie/IndexMovieBanner';


const Slide =({movie})=>{
    return(
        <div className={indexSliderStyle.sliderHeight}
             style={{backgroundImage:`url(${process.env.BaseUrl}${movie.poster})`}}>
            {movie.title}
        </div>
    )
};

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={indexSliderStyle.nextBtn}
            onClick={onClick}
        />
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={indexSliderStyle.prevBtn}
            onClick={onClick}
        />
    );
}

function IndexSlider() {
    const {data}=useSWR(`${process.env.BaseUrl}/api/site/slider`,fetcher);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        rtl: true,
        autoplay: false,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };



    // console.log('sliders',sliders);
    // useEffect( ()=>{
    //
    // },[]);

    return(
        <div className='mb-4' >

            {
                // console.log('slide data',data)
            }
            <Slider {...settings}>
                {data?.sliders.map(slide=>{
                    // console.log(slide);
                    // return <Slide key={slide.id} movie={slide}/>
                    return slide ? <IndexMovieBanner key={slide.token} slide={slide}  />:'';
                })}
            </Slider>
        </div>
    )
}

export default IndexSlider;


