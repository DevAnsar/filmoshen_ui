import Layout from "../Layout";
import NumberFormat from 'react-number-format';

function MyPayments({mypayments, user}) {
    return (
        <Layout user={user}>
            <div className="col-xl-12 col-lg-12 col-xs-12">
                <div className="card" style={{border:'none'}}>
                    <div className="table-responsive">
                        <table className=" table table-bordered table-hover">

                            <thead>
                            <tr>
                                <th>#</th>
                                <th>تاریخ پرداخت</th>
                                <th>مبلغ</th>
                                <th>اشتراک</th>
                                <th>وضعیت</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                mypayments?.map((pay, index) => {
                                    return (
                                        <tr key={pay.id} className="">
                                            <th className="font-small-2">
                                                {index + 1}
                                            </th>
                                            <th className="font-small-2">
                                                {
                                                    pay.created_at
                                                }
                                            </th>
                                            <th className="font-small-2">
                                                <NumberFormat value={pay.amount} displayType={'text'} thousandSeparator={true} prefix={''} />
                                                {
                                                    ' تومان '
                                                }
                                            </th>
                                            <th className="font-small-2">
                                                {
                                                    pay.subscribe_id
                                                }
                                            </th>
                                            <th className="font-small-2">
                                                {
                                                    pay.status === '1' ?
                                                        <>
                                                            <div className='btn btn-sm btn-success'>پرداخت شده</div>
                                                        </>
                                                        :
                                                        <>
                                                            <div className='btn btn-sm btn-warning'>پرداخت نشده</div>

                                                        </>
                                                }
                                            </th>
                                        </tr>
                                    )
                                })
                            }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default MyPayments;