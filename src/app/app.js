import { readdir } from 'fs/promises';
import { join } from 'path';
import {
    GatewayIntentBits,
    Partials
}
from 'discord.js';
import { SapphireClient } from '@sapphire/framework';
import Log from './utils/Log.js'
import { init, Integrations } from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';

initializeSentryIO();

const client = initializeClient();
initializeEvents();

client.login(process.env.DISCORD_BOT_TOKEN).catch(Log.error);

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
    }
    return new SapphireClient(clientOptions);
};

// the events handler
async function initializeEvents() {
    
    client.on('error', Log.error);

    const eventsPath = new URL('./events', import.meta.url);
    const eventsArray = await readdir(eventsPath);
    const eventFiles = eventsArray.filter(file => file.endsWith('.js'));
    // client.events = new Collection();
    eventFiles.forEach(async function(file) {
        const filePath = join(eventsPath.toString(), file);
        const eventModule = await import(filePath);
        const event = await eventModule.default;
        // client.events.set(event.name, event);
        try {
            if (event.once) {
              client.once(event.name, (...args) => event.execute(...args, client));
            } else {
              client.on(event.name, (...args) => event.execute(...args, client));
            }
          } catch (e) {
            console.error('events error:', e);
          }
    })
    return client.events;
};

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