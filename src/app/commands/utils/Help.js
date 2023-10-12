import { Command } from '@sapphire/framework';

export default class Help extends Command {
	constructor(ctx) {
		super(ctx, {
			name: 'help',
			description: 'Provides basic commands support'
		});
	}

	registerApplicationCommands(registry) {
		registry.registerChatInputCommand((builder) =>
			builder.setName('help').setDescription('Provides basic commands support')
		);
	}
}