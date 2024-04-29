// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://hexanomedufutur:LCQbwYjD0LLaTxRW@arca-metadata-storage.qp6278d.mongodb.net/";
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
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            await this.createDocument(client,{
                name: "Jean",
                age: 30
            })
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

    public async createDocument(client, newDocument){
        const result = await client.db("arca-metadata").collection("arca").insertOne(newDocument);
        console.log(`New document created with the following id: ${result.insertedId}`);
    }
}