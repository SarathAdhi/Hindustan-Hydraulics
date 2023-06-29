const RabbitMQ = require("./RabbitMq.class");

async function main() {
  try {
    const rabbit = new RabbitMQ();

    await rabbit.connect();
    i = 1;
    setInterval(() => {
      i++;
      rabbit.publishMessage("supply", `Hello ${i}`);
    }, 1);
  } catch (e) {
    console.log(e);
  }
}

main();
