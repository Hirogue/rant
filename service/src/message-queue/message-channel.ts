import { Channel } from "amqplib";

export class MessageChannel {

    constructor(
        private readonly ch: Channel,
        private readonly name: string
    ) { }

    get Name() {
        return this.name;
    }

    async send(content: any) {

        await this.ch.assertQueue(this.name);

        content = Buffer.from(JSON.stringify(content));

        return await this.ch.sendToQueue(this.name, content);
    }

    async consume(handler) {

        await this.ch.assertQueue(this.name);
        await this.ch.consume(this.name, async (msg) => {

            const content = JSON.parse(msg.content.toString());

            await handler(content);

            await this.ch.ack(msg);
        });
    }

    async close() {
        await this.ch.close();
    }
}