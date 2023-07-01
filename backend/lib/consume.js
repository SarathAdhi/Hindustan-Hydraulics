const RabbitMQ = require("./RabbitMq.class");

async function main() {
	const rabbit = new RabbitMQ();

	await rabbit.connect();
	rabbit.subscribeMessage("HINDUSTAN");
}

main();
