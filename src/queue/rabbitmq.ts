import amqp from 'amqplib/callback_api';
import { QUEUE_URL } from '../utils/config';

export const startQueueWorker = async (): Promise<void> => {
  const connection = await new Promise<amqp.Connection>((resolve, reject) => {
    amqp.connect(QUEUE_URL, (error, conn) => {
      if (error) {
        reject(error);
      } else {
        resolve(conn);
      }
    });
  });

  const channel = await new Promise<amqp.Channel>((resolve, reject) => {
    connection.createChannel((error, ch) => {
      if (error) {
        reject(error);
      } else {
        resolve(ch);
      }
    });
  });

  const exchangeName = 'notifications';

  await new Promise<void>((resolve, reject) => {
    channel.assertExchange(exchangeName, 'fanout', { durable: false }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });

  const { queue } = await new Promise<amqp.Replies.AssertQueue>((resolve, reject) => {
    channel.assertQueue('', { exclusive: true }, (error, q) => {
      if (error) {
        reject(error);
      } else {
        resolve(q);
      }
    });
  });

  channel.bindQueue(queue, exchangeName, '');

  channel.consume(queue, (message) => {
    const notification = JSON.parse(message.content.toString());
    console.log('Received notification:', notification);
    // Handle the notification as needed
    channel.ack(message);
  });

  console.log('Worker started');
};
