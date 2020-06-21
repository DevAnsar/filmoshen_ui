import React from 'react';
import Index from './../components/index/Index';
import initialize from "../utils/initialize";
import {connect} from 'react-redux';


// import axios from 'axios';
function index() {

    return (
            <Index/>
    )
}

index.getInitialProps = async ctx => {
    initialize(ctx);
};

export default connect((state => state))(index);
