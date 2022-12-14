const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const router = express.Router();
mongoose.set('strictQuery', true);


//Controllers
const authController = require('./backend/controllers/auth');


//Routers
const AuthRouter = require('./backend/routes/auth');
const OrderRouter = require('./backend/routes/orders');
const StoreRouter = require('./backend/routes/stores');
const BillingRouter = require('./backend/routes/billing');


//Utils
const AppError = require('./backend/utils/error');


const app = express();
const ConnectDB = require('./backend/db');
ConnectDB();

//Configurations
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes
app.use('/auth', AuthRouter);
app.use('/order', OrderRouter);
app.use('/supply', StoreRouter);
app.use('/bill', BillingRouter);


app.get('/', authController.protect, authController.restrictTo('user'), (req, res) => {
    res.json({
        "status": "success",
        "API": "Hindustan Web API",
        "version": "0.1.2",
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(new AppError('Endpoint Not Found', 404));

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

// console.log(typeof)


app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message
    });
})
app.listen(3000, () => {
    console.log('Server running on port 3000');
});