const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const port = 80;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        server.use(cookieParser());

        server.use(bodyParser.urlencoded({extended: false}));
        server.use(bodyParser.json());


        server.get('/login', (req, res) => {
            if (req.cookies.token) {
                res.redirect('/');
            } else {
                return app.render(req, res, '/login', req.query);
            }
        });

        server.get('/register', (req, res) => {
            if (req.cookies.token) {
                res.redirect('/');
            } else {
                return app.render(req, res, '/register', req.query);
            }
        });

        server.get('/subscribe/:id', (req, res) => {
                // res.redirect(`http://api.filmoshen.ir:8080/site/payment/get/${req.params.id}?api_token=${req.cookies.token}`);
                res.redirect(`http://192.186.1.104:8888/site/payment/get/${req.params.id}?api_token=${req.cookies.token}`);
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });

