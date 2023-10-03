import { MongoClient, ServerApiVersion } from 'mongodb';
import Log from './Log.js';

const mongoDBURIPartial = `${process.env.MONGODB_PREFIX}://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASS}@${process.env.MONGODB_CLUSTER}/`;
const options = {
    appname: process.env.APP_NAME,
    serverAPI: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    },
    writeConcern: {
        w: 'majority'
    }
}

const mongoClient = new MongoClient(mongoDBURIPartial, options);

export default async function connect(database) {
        try {
            // let db;
            Log.debug(`Connecting to ${database} for the first time!`);

            await mongoClient.connect();
            
            await mongoClient.db(database).command({ ping: 1 });
            Log.debug('Pinged your deployment. You successfully connected to MongoDB!');

			// db = mongoClient.db();
            // return db;
        } finally {
            await mongoClient.close();
        }
    };

// export default connect;