import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateAiDocumentValidator from 'App/Validators/Pipelines/CreateAiDocumentValidator';
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://hexanomedufutur:LCQbwYjD0LLaTxRW@arca-metadata-storage.qp6278d.mongodb.net/";
import Drive from '@ioc:Adonis/Core/Drive';
import fs from 'fs';
import axios from 'axios';

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
        axios.post('http://127.0.0.1:5000/create_metadata', {
            id: _id,
            filename: fileName
        })
        


        return response.status(200).json({message: 'Document créé avec succès'})
        
        }

}
