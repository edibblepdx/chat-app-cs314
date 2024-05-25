require('dotenv').config;
const amqp = require('amqplib');
const User = require('../models/userModel');

const messageBrokerURL = process.env.MESSAGE_BROKER_URL;

class RabbitMQService {
  constructor() {
    this.requestQueue = "USER_DETAILS_REQUEST";
    this.responseQueue = "USER_DETAILS_RESPONSE";
    this.connection = null;
    this.channel = null;
    this.init();
  }

  async init() {
    // Establish connection to RabbitMQ server
    this.connection = await amqp.connect(messageBrokerURL);
    this.channel = await this.connection.createChannel();

    // Asserting queues ensures they exist
    await this.channel.assertQueue(this.requestQueue);
    await this.channel.assertQueue(this.responseQueue);

    // Start listening for messages on the request queue
    this.listenForRequests();
  }

  async listenForRequests() {
    this.channel.consume(this.requestQueue, async (msg) => {
      if (msg && msg.content) {
        const { userId } = JSON.parse(msg.content.toString());
        const userDetails = await getUserDetails(userId);

        // Send the user details response
        this.channel.sendToQueue(
          this.responseQueue,
          Buffer.from(JSON.stringify(userDetails)),
          { correlationId: msg.properties.correlationId }
        )

        // Acknowledge the processed message
        this.channel.ack(msg);
      }
    });
  }
}

const getUserDetails = async (userId) => {
  const userDetails = await User.findById(userId).select("-password");
  if (!userDetails) {
    console.log("User not found");
  }

  return userDetails;
};

module.exports = new RabbitMQService();