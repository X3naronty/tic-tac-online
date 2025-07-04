import { connect } from 'amqplib';

(async () => {
    const connection = await connect();

    const channel = await connection.createChannel();

    const queueName = 'rpc_queue';

    // channel.assertQueue(queueName, { durable: false });
    channel.prefetch(1);
    channel.consume(queueName, (msg) => {
        const n = parseInt(msg.content.toString());

        const ans = fibonacci(n);

        
        channel.sendToQueue(msg.properties.replyTo, Buffer.from(ans.toString()), {
            correlationId: msg.properties.correlationId,
        });

        channel.ack(msg);
    });
})();

function fibonacci(n) {
    if (n == 0 || n == 1) return n;
    else return fibonacci(n - 1) + fibonacci(n - 2);
}
