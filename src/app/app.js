import {
	GatewayIntentBits,
	Partials
} from 'discord.js';
import OverloadClient from './utils/OverloadClient.js';
import Log from './utils/Log.js';
import { init, Integrations } from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';

initializeSentryIO();

const client = initializeClient();

client.login(process.env.DISCORD_BOT_TOKEN).catch(error => Log.error(error));

function initializeClient() {
	const clientOptions = {
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMembers,
			GatewayIntentBits.GuildEmojisAndStickers,
			GatewayIntentBits.GuildVoiceStates,
			GatewayIntentBits.GuildPresences,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.GuildMessageReactions,
			GatewayIntentBits.GuildModeration,
			GatewayIntentBits.DirectMessages,
			GatewayIntentBits.GuildMessageReactions,
		],
		partials: [
			Partials.Message,
			Partials.Channel,
			Partials.Reaction,
			Partials.User
		],
	};
	return new OverloadClient(clientOptions);
}

// Sentry setup
function initializeSentryIO() {
	const root = new URL('./', import.meta.url);
	init({
		dsn: process.env.SENTRY_IO_DSN,
		tracesSampleRate: 1.0,
		environment: process.env.NODE_ENV,
		
		integrations: [
			new RewriteFrames({
				root: root,
			}),
			new Integrations.Http({ tracing: true }),
		],
	});
}