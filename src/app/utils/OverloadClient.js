import { SapphireClient } from '@sapphire/framework';
import { getRootData } from '@sapphire/pieces';
import { join } from 'path';

export default class OverloadClient extends SapphireClient {
	rootData = getRootData();
	constructor(options) {
		super(options);

		this.stores.get('listeners').registerPath(join(this.rootData.root, 'events'));
	}
}