import App, {Container} from 'next/app';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/style.css';
import '../style/ExpansionPanel.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-tabs/style/react-tabs.css';

import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import {initStore} from '../redux';
import Master from "../components/Master";

export default withRedux(initStore, {debug: true})(
    class MyApp extends App {


        static async getInitialProps({Component, ctx}) {
            return {
                pageProps: {
                    ...(Component.getInitialProps
                        ? await Component.getInitialProps(ctx)
                        : {})
                }
            };
        }

        render() {
            const {Component, pageProps, store} = this.props;

            return (
                <Container>
                    <Provider store={store}>
                        <Master>
                            <Component {...pageProps} />
                        </Master>
                    </Provider>
                </Container>
            )
        }
    }
)


