import pino from 'pino';
import Sentry from '@sentry/node';

// const command = interaction.client.commands.get(interaction.commandName);

let pinoLevel;
if (process.env.NODE_ENV != 'production') {
    pinoLevel = 'trace';
} else {
    pinoLevel = 'info';
}

const transport = pino.transport({
    target: 'pino-sentry-transport',
    options: {
        name: process.env.APP_NAME,
        level: pinoLevel,
        batching: true,
        interval: 5,
        host: process.env.LOKI_HOST,
        sentry: {
            dsn: process.env.SENTRY_IO_DSN
        }
    }
});

let logger;

try {
    logger = pino(transport);
	logger.info('Logger initialized!');
} catch (e) {
	// eslint-disable-next-line no-console
	console.log('Please setup Pino basicAuth.');
	// eslint-disable-next-line no-console
	console.log(e);
	throw new Error();
};

const Log = {

    fatal(statement, options) {
        logger.fatal(statement, options);
        Sentry.addBreadcrumb({
            level: 'fatal',
            message: statement
        });
        if (process.env.NODE_ENV != 'production') {
            // eslint-disable-next-line no-console
			console.error(statement);
        }
    },

    error(statement, options) {
        logger.error(statement, options);
        Sentry.addBreadcrumb({
            level: 'error',
            message: statement
        });
        if (process.env.NODE_ENV != 'production') {
            // eslint-disable-next-line no-console
			console.error(statement);
        }
    },

    warn(statement, options) {
        logger.warn(statement, options);
        Sentry.addBreadcrumb({
            level: 'warn',
            message: statement
        });
        if (process.env.NODE_ENV != 'production') {
            // eslint-disable-next-line no-console
			console.error(statement);
        }
    },

    info(statement, options) {
        logger.info(statement, options);
        Sentry.addBreadcrumb({
            level: 'info',
            message: statement
        });
        if (process.env.NODE_ENV != 'production') {
            // eslint-disable-next-line no-console
			console.error(statement);
        }
    },

    debug(statement, options) {
        logger.debug(statement, options);
        Sentry.addBreadcrumb({
            level: 'debug',
            message: statement
        });
        if (process.env.NODE_ENV != 'production') {
            // eslint-disable-next-line no-console
			console.error(statement);
        }
    },

    trace(statement, options) {
        logger.trace(statement, options);
        Sentry.addBreadcrumb({
            level: 'trace',
            message: statement
        });
        if (process.env.NODE_ENV != 'production') {
            // eslint-disable-next-line no-console
			console.error(statement);
        }
    },

    log(statement, options) {
        logger.log(statement, options);
        Sentry.addBreadcrumb({
            level: 'log',
            message: statement
        });
        if (process.env.NODE_ENV != 'production') {
            // eslint-disable-next-line no-console
			console.error(statement);
        }
    },

    flush() { logger.flush(); }

};

export default Log;