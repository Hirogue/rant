import chalk from 'chalk';
import * as moment from 'moment';
import * as util from 'util';
import { format } from 'winston';
import { LoggerLevel } from './logger-level.enum';

export class LoggerFormat {
    public static createFormat(label: string = 'Nest') {
        return format.combine(
            format.label({ label }),
            format.timestamp(),
            format.printf(({ context, lineNumber, columnNumber, level, message, label, timestamp }) => {
                timestamp = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');

                const contextOutput = context ? chalk.yellow(`[${context}]`) : '';

                let colorRender = (str) => str;

                switch (level) {
                    case LoggerLevel.ERROR:
                        colorRender = chalk.red;
                        break;
                    case LoggerLevel.WARN:
                        colorRender = chalk.yellow;
                        break;
                    case LoggerLevel.VERBOSE:
                        colorRender = chalk.cyan;
                        break;
                    case LoggerLevel.DEBUG:
                        colorRender = chalk.grey;
                        break;
                    default:
                        colorRender = chalk.green;
                        break;
                }

                const dataOutput = colorRender(util.isObject(message) ? util.inspect(message, false, 3, true) : message);
                const positionOutput = lineNumber && columnNumber ? ` [${lineNumber}, ${columnNumber}]` : '';

                return `${chalk.green(`[${label}] ${process.pid}   -`)} ${timestamp}   ${contextOutput} ${dataOutput} ${positionOutput}`;
            })
        );
    }
}
