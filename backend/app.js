const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const { WebClient } = require('@slack/web-api');



const router = express.Router();
// const publish = require('./lib/RabbitMq.class');
mongoose.set("strictQuery", true);

require('dotenv').config()

const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);


//Controllers
const authController = require("./supply/controllers/auth");

//Routers

//Supply
const AuthRouter = require("./supply/routes/auth");
const OrderRouter = require("./supply/routes/orders");
const StoreRouter = require("./supply/routes/stores");
const BillingRouter = require("./supply/routes/billing");
const CounterRouter = require("./supply/routes/counter");
const SecurityRouter = require("./supply/routes/security");

//Inward
const InwardRouter = require("./inward/routes/inward");
const StoreInwardRouter = require("./inward/routes/stores");
const SecurityInwardRouter = require("./inward/routes/security");

//Utils
const AppError = require("./utils/error");

const app = express();
const ConnectDB = require("./db");
ConnectDB();

//Configurations
app.use(logger("dev"));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Routes

//Supply
app.use("/auth", AuthRouter);
app.use("/supply/order", OrderRouter);
app.use("/supply/store", StoreRouter);
app.use("/supply/bill", BillingRouter);
app.use("/supply/counter", CounterRouter);
app.use("/supply/security", SecurityRouter);

//Inward
app.use("/inward", InwardRouter);
app.use("/inward/store", StoreInwardRouter);
app.use("/inward/security", SecurityInwardRouter);

app.get(
  "/",
  authController.protect,
  authController.restrictTo("user"),
  (req, res) => {
    res.json({
      status: "success",
      API: "Hindustan Web API",
      version: "0.1.2",
    });
  }
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new AppError("Endpoint Not Found", 404));
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
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') {
    console.log(err);
    slackClient.chat.postMessage({
        channel: 'C05C794T08M',
        text: {"messge":err.message,err,req},
      })
        .then((result) => {
          console.log('Message sent successfully:', result.ts);
        })
        .catch((error) => {
          console.error('Error sending message to Slack:', error);
        });
      }
    res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message
    });
})


app.listen(3000, () => {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') {

    slackClient.chat.postMessage({
        channel: 'C05C794T08M',
        text: "Server Started",
      })
        .then((result) => {
          console.log('Message sent successfully:', result.ts);
        })
        .catch((error) => {
          console.error('Error sending message to Slack:', error);
        });
      }
    console.log('Server running on port 3000');
});
