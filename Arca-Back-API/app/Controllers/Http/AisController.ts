import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateAiDocumentValidator from 'App/Validators/Pipelines/CreateAiDocumentValidator';
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://hexanomedufutur:LCQbwYjD0LLaTxRW@arca-metadata-storage.qp6278d.mongodb.net/";
import Drive from '@ioc:Adonis/Core/Drive';
import fs from 'fs';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import Person from 'App/Models/Person';
const https = require('https');

// Create an instance of Axios with custom HTTPS agent
const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false // Ignore certificate verification errors
    })
});


const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

export default class AisController {

    public async uploadDoc({ auth,bouncer,response,request}:HttpContextContract){
            
        await auth.use('api').authenticate()
        await bouncer.with('AiPolicy').authorize('create')
    
        await client.connect();
        await client.db("admin").command({ ping: 1 });

        const payload = await request.validate(CreateAiDocumentValidator)
        const _id = Math.random().toString(36).substr(2) + Date.now().toString(36);
        const fileName= _id+'.'+payload.file.extname
        const doc={
            _id: _id,
            name: payload.file.clientName,
            filename: fileName,
            createdBy: auth.user?.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            updatedBy: auth.user?.id
        }

        await client.db("reviewDB").collection("review").insertOne(doc);

        if (payload.file.tmpPath) {
            console.log(payload.file.tmpPath)
            const buffer = fs.readFileSync(payload.file.tmpPath);
            await Drive.put(fileName ,buffer)
        } else {
            console.log('Le fichier n\'a pas été déplacé à un emplacement temporaire');
        }

        //appel à une api, parametre :  _id et filename
        let worked=0
        await instance.post('https://127.0.0.1:5000/create_metadata', {
            id: _id,
            filename: fileName
        }, {
            headers: {
                'x-api-key': Env.get('API_KEY')
            }
        }).then(response => {
            //console.log('Response:', response.data);
            if(response.status==200){
                worked=1
            }
            //console.log('Response:', response.data);
            if(response.status==200){
                worked=1
            }
        }).catch(error => {
            console.error('Error:', error);
        });
        console.log(worked)
        if(worked==0){
            await Drive.delete(fileName)
            await client.db("reviewDB").collection("review").deleteOne({_id: _id})
            return response.status(500).json({message: 'Erreur lors de la création du document'})
        }
        console.log(worked)
        if(worked==0){
            await Drive.delete(fileName)
            await client.db("reviewDB").collection("review").deleteOne({_id: _id})
            return response.status(500).json({message: 'Erreur lors de la création du document'})
        }
        return response.status(200).json({message: 'Document créé avec succès'})
        
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
}
