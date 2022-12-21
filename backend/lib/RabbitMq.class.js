// // const amqp = require('amqplib');
// // const catchAsync = require('../utils/catchAsync');

// const config = {
//         protocol: 'amqp',
//         hostname: 'lab.zuvatech.com',
//         port: 5672,
//         username: 'root',
//         password: 'zuvaLabs',
//         locale: 'en_US',
//         frameMax: 0,
//         heartbeat: 0,
//         vhost: '/',
//     }
//     // const msgBuffer = Buffer.from(JSON.stringify({ number: 10 }));

// // exports.publish = catchAsync(async(req, res, next) => {
// //     const conn = await amqp.connect(config);
// //     const ch = await conn.createChannel();
// //     const queue = 'supply';
// //     const msg = { 'event': 'billing' };
// //     const msgBuffer = Buffer.from(JSON.stringify(msg));
// //     const qu = await ch.assertQueue(queue);
// //     while (true) {
// //         await ch.sendToQueue(queue, msgBuffer);
// //         console.log(" [x] Sent %s", msg);
// //     }

// // })

// const amqplib = require('amqplib');

// // var amqp_url = process.env.CLOUDAMQP_URL || 'amqp://localhost:5672';

// async function produce() {
//     try {
//         console.log("Publishing");
//         var conn = await amqplib.connect(config, "heartbeat=60");
//         var ch = await conn.createChannel()
//         var exch = 'hindustan';
//         var q = 'test';
//         // var rkey = 'test_route';
//         var msg = { 'event': 'billing' };
//         await ch.assertExchange(exch, 'direct', { durable: true }).catch(console.error);
//         await ch.assertQueue(q, { durable: true });
//         await ch.bindQueue(q, exch, q);
//         // while (true) {
//         //     ch.publish(exch, rkey, Buffer.from(msg));
//         // }
//         for (let i = 0; i < 100000; i++) {
//             ch.publish(exch, q, Buffer.from(JSON.stringify(msg)));
//             console.log(" [x] Sent %s", msg);
//         }
//         // ch.publish(exch, rkey, Buffer.from(msg));
//         setTimeout(function() {
//             ch.close();
//             conn.close();
//         }, 500);
//     } catch (e) {
//         console.log(e);
//     }
// }

// async function do_consume() {
//     try {
//         var conn = await amqplib.connect(config, "heartbeat=60");
//         var ch = await conn.createChannel()
//         var q = 'test';
//         await conn.createChannel();
//         await ch.assertQueue(q, { durable: true });
//         await ch.consume(q, function(msg) {
//             console.log(msg.content.toString());
//             ch.ack(msg);
//             // ch.cancel('myconsumer');
//         }, { consumerTag: 'myconsumer' });
//         setTimeout(function() {
//             ch.close();
//             conn.close();
//         }, 5000);
//     } catch (e) {
//         console.log(e);
//         do_consume();
//     }
// }

// do_consume();


// // produce();