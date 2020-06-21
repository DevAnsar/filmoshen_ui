const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const port = parseInt(process.env.PORT, 10) || 3000;
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

// PassengerBaseUrl /
// PassengerAppRoot /home/filmoshen/domains/filmoshen.ir/myapp
//
// PassengerAppType node
// PassengerStartupFile server.js
