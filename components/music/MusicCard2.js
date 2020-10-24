import Link from 'next/link';
import MovieCardStyle from '../../style/MovieCard.module.css';
import slider from '../../style/HorizontalList.module.css';
import rtl from '../../style/reboot.module.css';
export const MusicCard2 = ({music}) => {


    return (
        <div className={`col-6  mt-3 ${rtl.rtl}`}>
            <Link as={`/music/${music.token}`} href='/music/[token]'>
                <a>
                    <div className={MovieCardStyle.menuItem}>
                        <img src={`${process.env.BaseUrl}${music.cover}`} className="img-fluid rounded"/>
                        <div className={` ${MovieCardStyle.itemBody}`}>
                            <div className={`${MovieCardStyle.hvrbox_text}`}>

                                <p className="pt-1">
                                    {music.title}
                                </p>
                                <p className="pt-1">
                                    {music.singers?.map(singer=>{
                                        return(
                                            <>
                                                {
                                                    singer.name
                                                }
                                                {music.singers.length>1?"-":''}
                                            </>

                                        )
                                    })}
                                </p>

                            </div>
                        </div>
                    </div>
                </a>
            </Link>
            {/*<p className="pt-1 f7 ">{music.title}</p>*/}
        </div>
    )
};