import { LoggerFormat, LoggerLevel } from '@rant/logger';
import { transports } from 'winston';

export default {
    level: LoggerLevel.DEBUG,
    format: LoggerFormat.createFormat(),
    transports: [new transports.Console()]
};