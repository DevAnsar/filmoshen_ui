import MovieCardStyle from '../../style/MovieCard.module.css';
import rtl from '../../style/reboot.module.css';
import Link from 'next/link';
export const MusicCard3 = ({music}) => {


    return (
        <div className={`col-12  mt-3 ${rtl.rtl}`}>
            <Link as={`/music/${music.token}`} href='/music/[token]'>
                <a>
                    <div className={`row mx-1 py-1 border-bottom`}>
                        <div className={`col-5 col-md-4`}>

                            <div className={MovieCardStyle.menuItem}>
                                <img src={`${process.env.BaseUrl}${music.cover}`} className="img-fluid rounded"/>
                                <div className={` ${MovieCardStyle.itemBody}`}>
                                    <div className={`${MovieCardStyle.hvrbox_text}`}>

                                        <p className="pt-1">
                                            {music.title}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={`col-7 col-md-8`}
                             style={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 flexWrap: 'wrap-reverse',
                                 justifyContent: 'center',
                                 alignItems: 'flex-end',
                                 alignContent: 'stretch',
                             }}>
                            <p className="pt-1 f11 ">{music.title}</p>

                            <div className="text-secondary font-s" style={{width: '100%'}}>
                                <div className=" ">
                                    <p className='pl-3 f6' style={{display: 'inline-block'}}>
                                        <i className='far fa-eye pl-1'/>
                                        {
                                            music ? music.viewCount : ''
                                        }
                                    </p>

                                    <p className='pl-3 f6' style={{display: 'inline-block'}}>
                                        <i className='fas fa-heart pl-1'/>
                                        {
                                            music ? music.likeCount : ''
                                        }
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
};