import { Events } from 'discord.js';
import Log from '../utils/Log.js';
import connect from '../utils/MongoDBUtils.js';

const ClientReady = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        try {
            Log.info(`${process.env.APP_NAME} is getting ready ...`);

            client.user.setActivity(process.env.DISCORD_BOT_ACTIVITY);
            client.guilds.cache.forEach(guild => {
				Log.info(`${process.env.APP_NAME} is active for: ${guild.id}, ${guild.name}`);
			});

            await connect(process.env.DB_NAME).catch(reason => { Log.error(reason) });

            Log.info(`${process.env.APP_NAME} is ready! Logged in as ${client.user.tag}` );
            
        } catch(e) {
            Log.error('Error processing event ClientReady:', e);
        }
        
    }
}

export default ClientReady;