import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateAiDocumentValidator from 'App/Validators/AI/CreateAiDocumentValidator';
import MongoDbGetValidator from 'App/Validators/MongoDbGetValidator';
import MongoDbValidator from 'App/Validators/MongoDbValidator';
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://hexanomedufutur:LCQbwYjD0LLaTxRW@arca-metadata-storage.qp6278d.mongodb.net/";
import Drive from '@ioc:Adonis/Core/Drive';
import fs from 'fs';

const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

export default class AisController {

    public async createDocument({ auth,bouncer,response,request}:HttpContextContract){
            
        await auth.use('api').authenticate()
        await bouncer.with('AiPolicy').authorize('create')
    
        await client.connect();
        await client.db("admin").command({ ping: 1 });

        const payload = await request.validate(CreateAiDocumentValidator)
        const fileName= payload._id+'.'+payload.file.extname
        const doc={
            _id: payload._id,
            s3_id: payload.s3_id,
            name: payload.file.clientName,
            filename: fileName,
            createdBy: auth.user?.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            updatedBy: auth.user?.id
        }
        const result = await client.db("reviewDB").collection("review").insertOne(doc);

        if (payload.file.tmpPath) {
            console.log(payload.file.tmpPath)
            const buffer = fs.readFileSync(payload.file.tmpPath);
            await Drive.put(fileName ,buffer)
            return response.status(200).json({message: 'Document créé avec succès'})
        } else {
            console.log('Le fichier n\'a pas été déplacé à un emplacement temporaire');
        }

        //appel à python, parametre : s3_id, _id et filename


        return response.status(200).json({message: 'Document créé avec succès'})
        
        }

}
