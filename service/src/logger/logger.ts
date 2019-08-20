import { Injectable, LoggerService as ILoggerService } from '@nestjs/common';
import Chalk from 'chalk';
import * as _ from 'lodash';
import * as Log4js from 'log4js';
import * as Moment from 'moment';
import * as path from 'path';
import * as StackTrace from 'stacktrace-js';
import * as Util from 'util';
import { ContextTrace } from './context-trace';
import { LoggerLevel } from './logger-level.enum';

const getInstance = () => {
    Log4js.addLayout('Rant', (logConfig: any) => {
        return (logEvent: Log4js.LoggingEvent): string => {
            let moduleName: string = '';
            let position: string = '';

            const messageList: string[] = [];
            logEvent.data.forEach((value: any) => {
                if (value instanceof ContextTrace) {
                    moduleName = value.context;
                    if (value.lineNumber && value.columnNumber) {
                        position = `${value.lineNumber}, ${value.columnNumber}`;
                    }
                    return;
                }

                if (typeof value !== 'string') {
                    value = Util.inspect(value, false, 3, true);
                }

                messageList.push(value);
            });

            const messageOutput: string = messageList.join(' ');
            const positionOutput: string = position ? ` [${position}]` : '';
            const typeOutput: string = `[${logConfig.type}] ${logEvent.pid.toString()}   - `;
            const dateOutput: string = `${Moment(logEvent.startTime).format('YYYY-MM-DD HH:mm:ss')}`;
            const moduleOutput: string = moduleName ? `[${moduleName}] ` : '[LoggerService] ';
            let levelOutput: string = `[${logEvent.level}] ${messageOutput}`;

            switch (logEvent.level.toString()) {
                case LoggerLevel.DEBUG:
                    levelOutput = Chalk.green(levelOutput);
                    break;
                case LoggerLevel.INFO:
                    levelOutput = Chalk.cyan(levelOutput);
                    break;
                case LoggerLevel.WARN:
                    levelOutput = Chalk.yellow(levelOutput);
                    break;
                case LoggerLevel.ERROR:
                    levelOutput = Chalk.red(levelOutput);
                    break;
                case LoggerLevel.FATAL:
                    levelOutput = Chalk.hex('#DD4C35')(levelOutput);
                    break;
                default:
                    levelOutput = Chalk.grey(levelOutput);
                    break;
            }

            return `${Chalk.green(typeOutput)}${dateOutput}    ${Chalk.yellow(
                moduleOutput
            )}${levelOutput}${positionOutput}`;
        };
    });

    Log4js.configure({
        appenders: {
            console: {
                type: 'stdout',
                layout: { type: 'Rant' }
            }
        },
        categories: {
            default: {
                appenders: ['console'],
                level: 'debug'
            }
        }
    });

    const logger = Log4js.getLogger();
    logger.level = LoggerLevel.TRACE;

    return logger;
}

@Injectable()
export class Logger implements ILoggerService {

    static instance = null;

    static get Instance() {
        if (!Logger.instance) {
            const logger = getInstance();
            Logger.instance = logger;
        }

        return Logger.instance;
    }

    static trace(...args) {
        Logger.Instance.trace(Logger.getStackTrace(), ...args);
    }

    static debug(...args) {
        Logger.Instance.debug(Logger.getStackTrace(), ...args);
    }

    static log(...args) {
        Logger.Instance.info(Logger.getStackTrace(), ...args);
    }

    static info(...args) {
        Logger.Instance.info(Logger.getStackTrace(), ...args);
    }

    static warn(...args) {
        Logger.Instance.warn(Logger.getStackTrace(), ...args);
    }

    static warning(...args) {
        Logger.Instance.warn(Logger.getStackTrace(), ...args);
    }

    static error(...args) {
        Logger.Instance.error(Logger.getStackTrace(), ...args);
    }

    static fatal(...args) {
        Logger.Instance.fatal(Logger.getStackTrace(), ...args);
    }

    static getStackTrace(deep: number = 2): ContextTrace {
        const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
        const stackInfo: StackTrace.StackFrame = stackList[deep];

        const lineNumber: number = stackInfo.lineNumber;
        const columnNumber: number = stackInfo.columnNumber;
        const fileName: string = stackInfo.fileName;

        const extnameLength: number = path.extname(fileName).length;
        let basename: string = path.basename(fileName);
        basename = basename.substr(0, basename.length - extnameLength);
        const context: string = _.upperFirst(_.camelCase(basename));

        return new ContextTrace(context, fileName, lineNumber, columnNumber);
    }

    trace(...args) {
        Logger.Instance.trace(Logger.getStackTrace(), ...args);
    }

    debug(...args) {
        Logger.Instance.debug(Logger.getStackTrace(), ...args);
    }

    log(...args) {
        Logger.Instance.info(Logger.getStackTrace(), ...args);
    }

    info(...args) {
        Logger.Instance.info(Logger.getStackTrace(), ...args);
    }

    verbose(...args) {
        Logger.Instance.info(Logger.getStackTrace(), ...args);
    }

    warn(...args) {
        Logger.Instance.warn(Logger.getStackTrace(), ...args);
    }

    warning(...args) {
        Logger.Instance.warn(Logger.getStackTrace(), ...args);
    }

    error(...args) {
        Logger.Instance.error(Logger.getStackTrace(), ...args);
    }

    fatal(...args) {
        Logger.Instance.fatal(Logger.getStackTrace(), ...args);
    }
}