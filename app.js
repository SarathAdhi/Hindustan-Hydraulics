const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const router = express.Router();
// const publish = require('./backend/lib/RabbitMq.class');
mongoose.set('strictQuery', true);


//Controllers
const authController = require('./backend/supply/controllers/auth');


//Routers

//Supply
const AuthRouter = require('./backend/supply/routes/auth');
const OrderRouter = require('./backend/supply/routes/orders');
const StoreRouter = require('./backend/supply/routes/stores');
const BillingRouter = require('./backend/supply/routes/billing');
const CounterRouter = require('./backend/supply/routes/counter')
const SecurityRouter = require('./backend/supply/routes/security');

//Inward
const InwardRouter = require('./backend/inward/routes/inward');
const StoreInwardRouter = require('./backend/inward/routes/stores');
const SecurityInwardRouter = require('./backend/inward/routes/security');

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

//Supply
app.use('/auth', AuthRouter);
app.use('/supply/order', OrderRouter);
app.use('/supply/store', StoreRouter);
app.use('/supply/bill', BillingRouter);
app.use('/supply/counter', CounterRouter);
app.use('/supply/security', SecurityRouter);

//Inward
app.use('/inward', InwardRouter);
app.use('/inward/store', StoreInwardRouter);
app.use('/inward/security', SecurityInwardRouter);


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