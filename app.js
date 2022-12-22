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

const EventEmitter = require('./backend/lib/EventEmitter.class');
const RabbitMQ = require('./backend/lib/RabbitMq.class');

// async function main() {
//     const rabbit = new RabbitMQ();
//     await rabbit.connect();
//     rabbit.subscribeMessage('supply', function() {
//         var axios = require('axios');

//         var config = {
//             method: 'get',
//             url: 'http://localhost:3000/supply/order/HH01',
//             headers: {
//                 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjE3YjU5YjdjNjM2NDJhYjgwY2JkYjViMDVlMGM1MDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzE3NDMxNzR9.db1pbENnTX8_X9j3Ihjlk5OZVSo3PRXe0b_nURGaUGeDrR4vWWpL0yfmM8jl1QlrX_EuThEsbcNmHsxWVSRc7GsbbhxyaxC2WvE2iMnyu-cLSpejGtG3ax6VVdFiAJK8BR0XvR4IjkGux7xajW7kTctAL2lrhRwLAMOBYh2ltX6XjJeTIOAOIJibvRqXJmWfQGdJkxeq25ai1QDbxkAPJi3Xai5gwxjYvi7U3C9kmhRRc5Zm00Cd3DUNk-bTY_98vLsV7fZzP87W5kkPt0OEYDFLu1j91rM796LmFDCvbGQ8zPqsPqrIw4LgCbubJHTn50PiCf7ejXVItNytn_ZPjw'
//             }
//         };

//         axios(config)
//             .then(function(response) {
//                 console.log(JSON.stringify(response.data));
//             })
//             .catch(function(error) {
//                 console.log(error);
//             });

//     });
//     // console.log('Received message');
// }

// main();

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