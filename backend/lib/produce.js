const config = {
	protocol: "amqp",
	hostname: "lab.zuvatech.com",
	port: 5672,
	username: "guest",
	password: "guest",
	locale: "en_US",
	frameMax: 0,
	heartbeat: 0,
	vhost: "/",
};

const amqplib = require("amqplib");

function produce() {
	try {
		console.log("Publishing");
		var conn = amqplib.connect(config, "heartbeat=60");

		var ch = conn.createChannel((err, ch) => {
			if (err) {
				console.log(err);
			}
			var exch = "hindustan";
			var q = "test";
			var msg = { event: "billing" };
			ch.assertExchange(exch, "direct", { durable: true }).catch(
				console.error
			);
			ch.assertQueue(q, { durable: true });
			ch.bindQueue(q, exch, q);
			for (let i = 0; i < 100000; i++) {
				ch.publish(exch, q, Buffer.from(JSON.stringify(msg)));
				console.log(" [x] Sent %s", msg);
			}
		});
		// var exch = 'hindustan';
		// var q = 'test';
		// var msg = { 'event': 'billing' };
		// ch.assertExchange(exch, 'direct', { durable: true }).catch(console.error);
		// ch.assertQueue(q, { durable: true });
		// ch.bindQueue(q, exch, q);
		// for (let i = 0; i < 100000; i++) {
		//     ch.publish(exch, q, Buffer.from(JSON.stringify(msg)));
		//     console.log(" [x] Sent %s", msg);
		// }
	} catch (e) {
		console.log(e);
	}
}

produce();
