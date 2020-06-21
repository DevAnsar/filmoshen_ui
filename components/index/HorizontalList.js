import React, {useState} from 'react';
import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ScrollMenu from 'react-horizontal-scrolling-menu';

import slider from '../../style/HorizontalList.module.css';

// One item component
// selected prop will be passed
const MenuItem = ({id, text, image, selected , token}) => {
    return (

        <div className={`menu-item ${selected ? 'active' : ''} ${slider.menuItem} cart p-0`}>

            <Link as={`/movie/${token}`} href='/movie/[token]'>
                <a>
                    <div className={`card-body p-0 ${slider.itemCover}`}
                         style={{backgroundImage: `url(${process.env.BaseUrl}${image})`}} ></div>

                    <div className={` ${slider.itemBody}`} >
                        {text}
                    </div>
                </a>
            </Link>
        </div>

    );
};

// All items component
// Important! add unique key
export const Menu = ( list, selected) => {
    console.log(list);
    return list?.map( el=> {
        // console.log(el);
        const {id} = el;
        const {token} = el;
        const {title} = el;
        const {cover} = el;

        return <MenuItem id={id} text={title} image={cover} key={token} token={token} selected={selected}/>;
    });
};


const Arrow = ({text, className}) => {
    return (
        <div className={className}>
            {text}
        </div>
    );
};
const ArrowLeft = Arrow({text: '<', className: 'arrow-prev'});
const ArrowRight = Arrow({text: '>', className: 'arrow-next'});

export const state = {
    alignCenter: true,
    clickWhenDrag: false,
    dragging: true,
    hideArrows: true,
    hideSingleArrow: true,
    scrollToSelected: false,
    translate: 0,
    transition: 0.3,
    wheel: false
};


export default function HorizontalList({movies, title}) {
    const [selected, SetSelected] = useState('item1');
    // console.log(movies);

    let menu = Menu(movies ? movies : [], selected);


    function setSelected(ev) {
        const {value} = ev.target;
        SetSelected(value);
    }

    const {
        alignCenter,
        clickWhenDrag,
        hideArrows,
        dragging,
        hideSingleArrow,
        scrollToSelected,
        translate,
        transition,
        wheel
    } = state;

    return (
        <>

            <Container fluid className='pt-2'>
                <Row className={slider.rtl}>
                    <div className="col-6 ">
                        <h6>{title}</h6>
                    </div>
                    <div className="col-6 text-left">
                        <a href="#" className="color-orange"> مشاهده همه</a>
                    </div>
                </Row>
                <div className={`progress ${slider.rtl}`} style={{height: '2px', backgroundColor: '#d4d5d5'}}>
                    <div className="progress-bar" style={{width: '15%', backgroundColor: '#f25823'}}/>
                </div>

                <Container fluid>
                    <ScrollMenu
                        alignCenter={alignCenter}
                        // arrowLeft={ArrowLeft}
                        // arrowRight={ArrowRight}
                        clickWhenDrag={clickWhenDrag}
                        data={menu}
                        dragging={dragging}
                        hideArrows={hideArrows}
                        hideSingleArrow={hideSingleArrow}
                        // onSelect={SetSelected(e=>e.value.target)}
                        scrollToSelected={scrollToSelected}
                        selected={selected}
                        transition={+transition}
                        translate={translate}
                        wheel={wheel}
                    />
                </Container>

            </Container>
        </>
    )
}

