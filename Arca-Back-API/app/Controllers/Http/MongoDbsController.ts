import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MongoDbGetValidator from 'App/Validators/MongoDbGetValidator';
import MongoDbValidator from 'App/Validators/MongoDbValidator';
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_KEY;

const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);


export default class MongoDbsController {

    public async run() {
        try {
            await client.connect();
            await client.db("admin").command({ ping: 1 });
            console.log("Votre déploiement a été pingé. Vous vous êtes connecté avec succès à MongoDB");
        } finally {
            await client.close();
        }
    }

    public async listDatabases() {
        try {
            await client.connect();
            const databasesList = await client.db().admin().listDatabases();
            console.log("Databases:");
            databasesList.databases.forEach(db => console.log(` - ${db.name}`));
        } finally {
            await client.close();
        }
    }

    public async createDocument({ response,request}:HttpContextContract){
        
        await client.connect();
        await client.db("admin").command({ ping: 1 });

        const payload = await request.validate(MongoDbValidator)
        const result = await client.db("arca-metadata").collection("arca").insertOne(payload);

        console.log(`Nouveau document créé avec l\'id suivant ${result.insertedId}`);
        return response.status(200).json({message: 'Document créé avec succès'})
    }

    public async findOneListingById({ response, request }: HttpContextContract) {
        await client.connect();
        await client.db("admin").command({ ping: 1 });

        const payload = await request.validate(MongoDbGetValidator)
        const result = await client.db("arca-metadata").collection("arca").findOne({ _id: payload._id });

        console.log(result);
        return response.status(200).json(result)
    }
}