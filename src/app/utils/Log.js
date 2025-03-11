import pino from 'pino';

let pinoLevel;
if (process.env.NODE_ENV != 'production') {
	pinoLevel = 'trace';
} else {
	pinoLevel = 'info';
}

const transport = pino.transport({
	target: 'pino-pretty',
	options: {
		translateTime: true,
		colorize: true,
		level: pinoLevel
	}
});

let Log;

try {
	Log = pino(transport);
	Log.info('Logger initialized!');
} catch (e) {
	// eslint-disable-next-line no-console
	console.log('Please setup Pino basicAuth.');
	// eslint-disable-next-line no-console
	console.log(e);
	throw new Error();
}

export default Log;