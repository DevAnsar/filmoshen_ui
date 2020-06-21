import React, {useEffect, useState} from 'react';

function LazyImage({loading, src}) {

    const [lazy, setLazy] = useState(loading);
    useEffect(() => {
        setLazy(status);
    }, [loading]);


    return (
        <div className='mx-auto mt-4'
             style={{
                 width: '100%',
                 background: '#ccc',
                 borderRadius: '5px',
                 boxShadow: '1px 1px 3px 3px #ccc',
                 minHeight: '300px',
                 overflow: 'hidden'
             }}>
            {
                !lazy ?
                    <>
                        {
                            src ?
                                <>
                                    <img src={src ? `${process.env.BaseUrl}${src}` : `/img/null_user.png`}
                                         className="img-fluid d-block "/>
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