import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://hexanomedufutur:LCQbwYjD0LLaTxRW@arca-metadata-storage.qp6278d.mongodb.net/";
import Drive from '@ioc:Adonis/Core/Drive';
import fs from 'fs';
import BasicUploadPipelineValidator from 'App/Validators/Pipelines/BasicUploadPipelineValidator';
import SearchValidator from 'App/Validators/Search/SearchValidator';

const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        strict: false,
        deprecationErrors: true,
    }
});

const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false // Ignore certificate verification errors
    })
});


export default class BasicUploadPipelinesController {

    public async uploadDoc({ auth,bouncer,response,request}:HttpContextContract){   
        await auth.use('api').authenticate()
        await bouncer.with('AiPolicy').authorize('create')

       await client.connect();
       await client.db("admin").command({ ping: 1 });

        const payload = await request.validate(BasicUploadPipelineValidator)    
        const _id = Math.random().toString(36).substr(2) + Date.now().toString(36);
        const extension = payload.file.extname
        const fileName= _id+'.'+extension
        const type = this.findType(extension!)

        const doc={
            _id: _id,
            filename: fileName,
            name: payload.titre,

            creator: auth.user?.lastname + ' '+auth.user?.firstname,
            createdAt: new Date(),
            updatedAt: new Date(),
            updatedBy: auth.user?.lastname + ' '+auth.user?.firstname,
            type: type,
            
            description: payload.description,
            retranscription: payload.retranscription,
            date: payload.date,
            endDate: payload.dateDeFin,
            people: payload.personnes?.split(';'),
            categories: payload.categories,
            towns: payload.villes?.split(';')
        }  
        if(payload.mongoDB=="ntbr"){    
            await client.db("arca-metadata").collection("arca").insertOne(doc);
        }else if (payload.mongoDB=="tbr"){
            await client.db("reviewDB").collection("review").insertOne(doc);
        }
        
        if (payload.file.tmpPath) {
            console.log(payload.file.tmpPath)
            const buffer = fs.readFileSync(payload.file.tmpPath);
            await Drive.put(fileName ,buffer)
            return response.status(200).json({message: 'Document créé avec succès'})
        } else {
            console.log('Le fichier n\'a pas été déplacé à un emplacement temporaire');
        }

        return response.status(200).json({message: 'Document créé avec succès'})
        
    }

    async complexSearch(searchQuery) {
        try {
            if (client.db) {
                await client.connect();
            }

            // Replace 'collection_name' with the actual name of your MongoDB collection
            const collection = client.db("arca-metadata").collection('arca');

            // Execute the search query
            let cursor = await collection.aggregate(searchQuery);

            return cursor;
        } catch (err) {
            console.error('Error executing complex search:', err);
            throw err;
        }
    }

    public async advancedSearch({ request, response }: HttpContextContract) {
        // Define your complex search query
        const payload = await request.validate(SearchValidator)

        const agg = [
            {
                $search: {
                    text: {
                        query: `${payload.query}`,
                        path: {
                            wildcard: "*"
                        }
                    }
                }
            },
            {
                $project: {
                    "name": 1,
                    "categories": 1,
                    "creator": 1,
                    "createdAt": 1,
                    "description": 1,
                    "retranscription": 1,
                    "towns": 1,
                    "people": 1,
                    "updatedBy": 1,
                    "updatedAt": 1,
                    "date": 1,
                    "endDate": 1,
                    score: { $meta: "searchScore" }
                }
            }
        ];

        const cursor = await this.complexSearch(agg);

        let results = [];

        await cursor.forEach((doc) => {
            console.log(doc)
            results.push(doc);
        });

        return response.status(200).json(results)
    }


}
