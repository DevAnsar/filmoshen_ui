import React, {useEffect, useState} from 'react';

function LazyImage({loading, src}) {

    const [lazy, setLazy] = useState(loading);
    useEffect(() => {
        setLazy(status);
    }, [loading]);


    return (
        <div className='mx-auto mt-4 d-inline-block'
             style={{

                 background: '#fff',
                 borderRadius: '5px',
                 boxShadow: '1px 1px 3px 3px #ccc',
                 minHeight: '300px',
                 width: '100%',
                 overflow: 'hidden'
             }}>
            {
                !lazy ?
                    <>
                        {
                            src ?
                                <>
                                    <img src={src ? `${process.env.BaseUrl}${src}` : `/img/null_user.png`}
                                         className="img-fluid d-block " style={{width:'100%'}} />
                                </>
                                :
                                ''
                        }

                    </>
                    :
                    <>
                        loading...
                    </>
            }
        </div>
    )
}


export default LazyImage;