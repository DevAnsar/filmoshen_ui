import Link from 'next/link';
import MovieCardStyle from '../../style/MovieCard.module.css';
import slider from '../../style/HorizontalList.module.css';
import rtl from '../../style/reboot.module.css';
export const MusicCard = ({music}) => {


    return (
        <div className={`col-6 col-md-3 col-lg-2 mt-3 ${rtl.rtl}`}>
            <Link as={`/music/${music.token}`} href='/music/[token]'>
                <a>
                    <div className={MovieCardStyle.menuItem}>
                        <img src={`${process.env.BaseUrl}${music.cover}`} className="img-fluid rounded"/>
                        <div className={` ${MovieCardStyle.itemBody}`}>
                            <div className={`${MovieCardStyle.hvrbox_text}`}>
                                <p className={`border bg-white pt-1 w-75 mx-auto color-orange ${MovieCardStyle.hvrbox_score} ${slider.color_orange}`}
                                   style={{borderRadius: '15px'}}>
                                    <i className='fas fa-heart mr-1'></i>
                                    88%
                                </p>
                                <p className="pt-1">
                                    {music.title}
                                </p>
                                <p className="pt-1">2020 - وحشت - هیجان انگیز</p>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
            <p className="pt-1 f7 ">{music.title}</p>
        </div>
    )
};