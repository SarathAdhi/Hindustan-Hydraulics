const amqp = require("amqplib");
const config = require("../rabbitconf");

module.exports = class RabbitMQ {
	constructor() {
		this.conn = null;
		this.ch = null;
		this.q = "test";
	}

	async connect() {
		try {
			this.conn = await amqp.connect(config);
			this.ch = await this.conn.createChannel();
		} catch (e) {
			console.log("Error in connecting to RabbitMQ");
			console.log(e);
			// do_consume();
		}
	}

	async sendMessage(queue, msg) {
		try {
			await this.ch.assertQueue(this.q, { durable: true });
			this.ch.sendToQueue(queue, Buffer.from(msg));
			console.log(" [x] Sent %s", msg);
		} catch (e) {
			console.log("Error in sending message");
			console.log(e);
		}
	}

	async publishMessage(exchange, msg) {
		try {
			await this.ch.assertExchange(exchange, "direct", { durable: true });
			if (typeof msg === "object") {
				msg = JSON.stringify(msg);
			}
			this.ch.publish(exchange, "", Buffer.from(msg));
			console.log(" [x] Sent %s", msg);
		} catch (e) {
			console.log("Error in publishing message");
			console.log(e);
		}
	}

	async subscribeMessage(exchange) {
		try {
			await this.ch.assertExchange(exchange, "direct", { durable: true });
			const q = await this.ch.assertQueue("", { exclusive: true });
			await this.ch.bindQueue(q.queue, exchange, "");

			this.ch.consume(
				q.queue,
				(msg) => {
					console.log(" [x] Received %s", msg.content.toString());
				},
				{ noAck: true }
			);
		} catch (e) {
			console.log("Error in subscribing message");
			console.log(e);
		}
	}
	async consumeMessage(queue) {
		try {
			await this.ch.assertQueue(queue, { durable: true });
			this.ch.consume(
				queue,
				(msg) => {
					console.log(" [x] Received %s", msg.content.toString());
				},
				{ noAck: true }
			);
		} catch (e) {
			console.log("Error in consuming message");
			console.log(e);
		}
	}

	async close() {
		try {
			await this.ch.close();
			await this.conn.close();
		} catch (e) {
			console.log("Error in closing connection");
			console.log(e);
		}
	}
};
