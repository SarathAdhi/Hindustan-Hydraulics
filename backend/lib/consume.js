const amqplib = require('amqplib');

const config = {
    protocol: 'amqp',
    hostname: 'lab.zuvatech.com',
    port: 5672,
    username: 'guest',
    password: 'guest',
    locale: 'en_US',
    frameMax: 0,
    heartbeat: 0,
    vhost: '/',
}

function do_consume() {
    try {
        var conn = amqplib.connect(config, "heartbeat=60");
        var ch = conn.createChannel()
        var q = 'test';
        conn.createChannel();
        ch.assertQueue(q, { durable: true });
        ch.consume(q, function(msg) {
            console.log(msg.content.toString());
            ch.ack(msg);
        }, { noAck: false });
    } catch (e) {
        console.log(e);
        // do_consume();
    }
}

do_consume();