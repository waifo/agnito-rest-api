const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const httpStatus = require("http-status");
const winstonInstance = require("./winston");
const expressWinston = require("express-winston");
const config = require("./config");
const routes = require("../router/router");

const app = express();

if(config.env === 'development'){
    app.use(logger('dev'));
}

//parsing body parameters and attaching them to req.body
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use('/api',routes);

//enable api logging in dev env
if(config.env === 'development'){
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    app.use(expressWinston.logger({
        winstonInstance,
        meta:true,
        msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
        colorSattus:true
    }));
}

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
    app.use(expressWinston.errorLogger({
      winstonInstance
    }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  })
);

module.exports = app;

