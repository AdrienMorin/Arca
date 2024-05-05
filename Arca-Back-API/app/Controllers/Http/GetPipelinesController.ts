import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://hexanomedufutur:LCQbwYjD0LLaTxRW@arca-metadata-storage.qp6278d.mongodb.net/";
import Drive from '@ioc:Adonis/Core/Drive';
import fs from 'fs';
import GetPipelineValidator from 'App/Validators/Pipelines/GetPipelineValidator';
import Person from "App/Models/Person";

const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

export default class GetPipelinesController {


    public async getDoc({ auth,bouncer,response,request}:HttpContextContract){   
        await auth.use('api').authenticate()
        await bouncer.with('AiPolicy').authorize('create')

       await client.connect();
       await client.db("admin").command({ ping: 1 });

        const payload = await request.validate(GetPipelineValidator)    
        const s3_name = payload.s3_name;

        const tempFolderPath = '../Arca-Front/temp'; 
        const tempFilePath = `${tempFolderPath}/${s3_name}`;

        fs.readdirSync(tempFolderPath).forEach((file) => {
            const filePath = `${tempFolderPath}/${file}`;
            fs.unlinkSync(filePath);
        });
        const contents = await Drive.get(s3_name);
        fs.writeFileSync(tempFilePath, contents);

        console.log("s3 done")

        const id = s3_name.split('.')[0];
        const result = await client.db("arca-metadata").collection("arca").findOne({ _id: id });

        interface Person {
            id: string;
            name: string;
        }

        const peopleList: Person[] = [];

        for (const personId of result.people) {
            const fetchedPerson = await Person.findOrFail(personId);
            peopleList.push({ id: personId, name: fetchedPerson.displayname });
        }
        result.people = peopleList

        console.log(result);
        console.log("mongo db done")

        return response.status(200).json(result)
        
    }

    public async getOldestDocuments({ response }: HttpContextContract) {
        try {
            await client.connect();
    
            const documents = await client.db("reviewDB").collection("review").find({})
                .sort({ dateDeCreation: 1 })
                .limit(30)
                .toArray();
    
            if (!documents.length) {
                return response.status(404).json({ message: "No documents found." });
            }
    
            var personIds = documents.reduce((acc, doc) => {
                if (doc.personnes && doc.personnes.length) {
                    acc.push(...doc.personnes.filter(id => !acc.includes(id)));
                }
                return acc;
            }, []);
    
            const people = await Person.query().whereIn('id', personIds);
            const peopleMap = new Map(people.map(person => [person.id.toString(), person.displayname]));
                            
            const result = documents.map(doc => ({
                extension: doc.filename?.split('.').pop(),
                name: doc.name,
                villes: doc.villes || [],
                personnes: (doc.personnes || []).map(id => peopleMap.get(id) || 'Unknown'),
                type: doc.type,
                date: doc.createdAt
            }));
    
            return response.json(result);
        } catch (error) {
            console.error("Error fetching oldest documents:", error);
            return response.status(500).json({ message: "Internal server error" });
        } finally {
            await client.close();
        }
    }
    
    public async getDocReview({ auth,bouncer,response,request}:HttpContextContract){   
        await auth.use('api').authenticate()
        await bouncer.with('AiPolicy').authorize('create')

       await client.connect();
       await client.db("admin").command({ ping: 1 });

        const payload = await request.validate(GetPipelineValidator)    
        const s3_name = payload.s3_name;

        const tempFolderPath = '../Arca-Front/temp'; 
        const tempFilePath = `${tempFolderPath}/${s3_name}`;

        fs.readdirSync(tempFolderPath).forEach((file) => {
            const filePath = `${tempFolderPath}/${file}`;
            fs.unlinkSync(filePath);
        });
        const contents = await Drive.get(s3_name);
        fs.writeFileSync(tempFilePath, contents);

        console.log("s3 done")

        const id = s3_name.split('.')[0];
        const result = await client.db("reviewDB").collection("review").findOne({ _id: id });

        interface Person {
            id: string;
            name: string;
        }

        const peopleList: Person[] = [];

        for (const personId of result.people) {
            const fetchedPerson = await Person.findOrFail(personId);
            peopleList.push({ id: personId, name: fetchedPerson.displayname });
        }
        result.people = peopleList

        console.log(result);
        console.log("mongo db done")

        return response.status(200).json(result)
        
    }


}
