const express = require('express');
const path = require('path');
const cors = require('cors');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const configurations = require('./configurations');
const port = configurations.port;
const websiteUrl = configurations.websiteUrl(port);

const mainRouter = require('./routers/main.router');

app
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'pug');

app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(cookieParser())
    .use('/', mainRouter);

app
    .use(cors())
    .use(express.json())
    // public folder
    .use(express.static(path.join(__dirname, 'public')))
    // catch 404 and forward to error handler
    .use((req, res, next) => {
        next(createError(404));
    })
    // error handler
    .use((err, req, res, next) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

app.listen(port);

console.log(`Server running at ${websiteUrl}`);