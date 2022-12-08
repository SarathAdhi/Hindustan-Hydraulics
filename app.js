var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ConnectDB = require('./backend/db');
var AuthRouter = require('./backend/routes/auth');
var authController = require('./backend/controllers/auth');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

// const uuid = uuidv4();
// console.log('String' + uuid.replace(/-/gi, ""));


const app = express();

ConnectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/auth', AuthRouter);

app.get('/', authController.protect, authController.restrictTo('user'), (req, res) => {
    res.json({
        "status": "success",
        "API": "Hindustan Web API",
        "version": "0.0.1",
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });


app.listen(3000, () => {
    console.log('Server running on port 3000');
});