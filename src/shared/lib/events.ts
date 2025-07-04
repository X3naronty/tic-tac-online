import { connect, ConsumeMessage, type ChannelModel } from 'amqplib';

// connection
// channel
// exchange / publish
// queue / send / consume / bind

// addListener
// emit => listener()

export class EventBrokerInstance {
    connection: ChannelModel | undefined;

    constructor(private exchangeName: string) {}

    async emit(key: string, newData: unknown) {
        if (!this.connection) {
            this.connection = await connect('amqp://localhost:5672');
        }

        const channel = await this.connection.createChannel();
        channel.publish(this.exchangeName, key, Buffer.from(JSON.stringify(newData)));
        setTimeout(() => {
            channel.close();
        });
    }

    async listen(key: string, handler: (data: unknown) => void) {
        if (!this.connection) {
            this.connection = await connect('amqp://localhost:5672');
        }

        const channel = await this.connection.createChannel();

        const eventQueue = await channel.assertQueue('', { exclusive: true });
        const exchange = await channel.assertExchange(this.exchangeName, 'direct', { durable: false });
        channel.bindQueue(eventQueue.queue, exchange.exchange, key);

        const consumer = await channel.consume(eventQueue.queue, (msg) => {
            handler(JSON.parse(msg!.content.toString()));
            channel.ack(msg!);
        });

        return () => {
            channel.close();
        };
    }

    close() {
        this.connection?.close();
    }
}

// import amqplib, { Connection } from "amqplib";

// let connection: Connection | undefined = undefined;
// export class EventsChanel {
//   constructor(private channelName: string) {}

//   async createChannel() {
//     if (!connection) {
//       connection = await amqplib.connect(process.env.MB_URL!);
//     }

//     const channel = await connection.createChannel();
//     await channel.assertExchange(this.channelName, "direct", {
//       durable: false,
//     });

//     return channel;
//   }

//   async emit(key: string, data: Record<string, unknown>) {
//     const channel = await this.createChannel();

//     channel.publish(
//       this.channelName,
//       key,
//       Buffer.from(
//         JSON.stringify({
//           ...data,
//           date: new Date(),
//         }),
//       ),
//     );
//   }

//   async concume(
//     key: string,
//     listener: (data: unknown) => Promise<void> | void,
//   ) {
//     const channel = await this.createChannel();

//     const queue = await channel.assertQueue("", { exclusive: true });
//     await channel.bindQueue(queue.queue, this.channelName, key);

//     const consumer = await channel.consume(queue.queue, async (data) => {
//       await listener(JSON.parse(data!.content.toString()));
//       channel.ack(data!);
//     });

//     return () => {
//       channel.cancel(consumer.consumerTag);
//     };
//   }
// }
