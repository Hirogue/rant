import { LoggerService } from '@rant/logger';
import { Job, Queue } from 'bull';
import { BullQueueEvents, InjectQueue, OnQueueActive, OnQueueEvent, Process, Processor } from 'nest-bull';

@Processor()
export class SmsTask {
    constructor(
        private readonly logger: LoggerService,
        @InjectQueue()
        private readonly queue: Queue
    ) {}

    async send(data: any) {
        await this.queue.add('register', data);
    }

    @Process({ name: 'register' })
    async register(job: Job) {
        return job.data;
    }

    @OnQueueActive()
    onActive(job: Job) {
        this.logger.debug(`Processing job ${job.id} of type ${job.name} with data`);
        this.logger.debug(job.data);
    }

    @OnQueueEvent(BullQueueEvents.COMPLETED)
    onCompleted(job: Job) {
        this.logger.debug(`Completed job ${job.id} of type ${job.name} with result`);
        this.logger.debug(job.returnvalue);
    }
}
