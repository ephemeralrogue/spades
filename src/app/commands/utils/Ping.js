import { isMessageInstance } from '@sapphire/discord.js-utilities';
import { Command } from '@sapphire/framework';

export default class Ping extends Command {
	constructor(ctx) {
		super(ctx, {
			name: 'ping',
			description: 'Replies with "Pong"'
		});
	}

	registerApplicationCommands(registry) {
		registry.registerChatInputCommand((builder) =>
			builder.setName('ping').setDescription('Ping bot to see if it is alive')
		);
	}

	async chatInputRun(interaction) {
		const msg = await interaction.reply({ content: 'Ping?', ephemeral: true, fetchReply: true });
	
		if (isMessageInstance(msg)) {
			const diff = msg.createdTimestamp - interaction.createdTimestamp;
			const ping = Math.round(this.container.client.ws.ping);
			return interaction.editReply(`Pong 🏓! (Round trip took: ${diff}ms. Heartbeat: ${ping}ms.)`);
		}
	
		return interaction.editReply('Failed to retrieve ping :(');
	}
}