import { Listener } from '@sapphire/framework';
import connect from '../utils/MongoDBUtils.js';
import Log from './../utils/Log.js';

export default class ClientReady extends Listener {
	/**
	 * @param {Listener.LoaderContext} context
	 */
	constructor(context) {
		super(context, {
			// Any Listener options you want here
			once: true,
			event: 'ready'
		});
	}

	async run(client) {

		try {
			
			Log.info(`${process.env.APP_NAME} is getting ready ...`);

			client.user.setActivity(process.env.DISCORD_BOT_ACTIVITY);
			client.guilds.cache.forEach(guild => {
				Log.info(`${process.env.APP_NAME} is active for: ${guild.id}, ${guild.name}`);
			});

			await connect(process.env.DB_NAME)
				.catch(error => Log.error(error, 'Error connecting to MongoDB'));
			
			Log.info(`${process.env.APP_NAME} is ready! Logged in as ${client.user.tag}`);
			
		} catch(error) {
			Log.error(
				error,
				'Error processing event ClientReady'
			);
		}
	}
}
