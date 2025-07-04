import { connect } from 'amqplib';

var args = process.argv.slice(2);
if (args.length == 0) {
    console.log('Usage: rpc_client.js num');
    process.exit(1);
}
(async () => {
    const connection = await connect(process.env.MB_URl);
    const channel = await connection.createChannel();
    const queue = await channel.assertQueue('', { exclusive: true });

    const correlationId = generateUuid();
    const num = parseInt(args[0]);

    console.log(' [x] Requesting fib(%d)', num);

    channel.consume(
        queue.queue,
        (msg) => {
            if (msg.properties.correlationId === correlationId) {
                console.log(' [.] Got %s', msg.content.toString());
                setTimeout(function () {
                    connection.close();
                    process.exit(0);
                }, 500);
            }
        },
        {
            noAck: true,
        }
    );

    channel.sendToQueue('rpc_queue', Buffer.from(num.toString()), {
        correlationId: correlationId,
        replyTo: queue.queue,
    });
})();

function generateUuid() {
    return Math.random().toString() + Math.random().toString() + Math.random().toString();
}
