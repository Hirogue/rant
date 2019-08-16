import { Channel } from "amqplib";

export class MsgQueue {

    constructor(
        private readonly ch: Channel,
        private readonly name: string
    ) { }

    get Name() {
        return this.name;
    }

    async send(content: any) {

        await this.ch.assertQueue(this.Name);

        content = Buffer.from(JSON.stringify(content));

        return await this.ch.sendToQueue(this.Name, content);
    }

    async consume(handler) {
        await this.ch.assertQueue(this.Name);
        await this.ch.consume(this.Name, async (msg) => {
            const content = JSON.parse(msg.content.toString());

            await handler(content);

            await this.ch.ack(msg);
        });
    }

    async close() {
        await this.ch.close();
    }
}