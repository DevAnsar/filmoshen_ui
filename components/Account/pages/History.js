import React from 'react';
import Layout from './../Layout';
// import {MovieCard} from "./../../components/movie/MovieCard";

// import withAuth from  './../../utils/withAuth';
function History(props) {

    return (
            <Layout user={props.user}>
                <h2>
                    history
                </h2>
            </Layout>
    )
}
// export default withAuth(History)
export default History