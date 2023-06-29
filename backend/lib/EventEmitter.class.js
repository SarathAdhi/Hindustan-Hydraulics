const RabbitMQ = require("./RabbitMq.class");
module.exports = class EventEmitter {
  constructor() {
    this.rabbit = new RabbitMQ();
  }

  async emit(msg) {
    try {
      await this.rabbit.connect();
      this.rabbit.publishMessage("HINDUSTAN", msg);
    } catch (e) {
      console.log(e);
    }
  }
};
