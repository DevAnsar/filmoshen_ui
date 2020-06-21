import Link from 'next/link';

function Light({children, status}) {

    const ErrorPage = () => {

        return (
            <div className='container p-5 my-5 '>
                <div className='row py-5' style={{textAlign: 'center'}}>
                    <div className='col-12 py-2' style={{textAlign: 'center',fontSize:'1.5rem'}}>
                        404
                    </div>
                    <div className='col-12 py-2'>
                        صفحه ای که به دنبال آن هستید یافت نشد
                    </div>
                    <div className='col-12 py-2'>
                        <Link href='/'>
                            <a>
                                خانه
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        )
    };
    return (
        <>
            {
                status ?
                    <>
                        {children}
                    </>
                    :
                    <ErrorPage/>
            }
        </>
    )
}

export default Light;