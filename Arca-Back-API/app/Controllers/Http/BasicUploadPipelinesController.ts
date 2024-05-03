import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://hexanomedufutur:LCQbwYjD0LLaTxRW@arca-metadata-storage.qp6278d.mongodb.net/";
import Drive from '@ioc:Adonis/Core/Drive';
import fs from 'fs';
import BasicUploadPipelineValidator from 'App/Validators/Pipelines/BasicUploadPipelineValidator';

const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

export default class BasicUploadPipelinesController {

    public async uploadDoc({ auth,bouncer,response,request}:HttpContextContract){   
        await auth.use('api').authenticate()
        await bouncer.with('AiPolicy').authorize('create')

       await client.connect();
       await client.db("admin").command({ ping: 1 });

        const payload = await request.validate(BasicUploadPipelineValidator)     
        const _id = Math.random().toString(36).substr(2) + Date.now().toString(36);
        const fileName= _id+'.'+payload.file.extname

        const doc={
            _id: _id,
            createur: auth.user?.id,
            dateDeCreation: new Date(),
            dateDeDerniereModif: new Date(),
            derniereModifPar: auth.user?.id,
            
            titre: payload.titre,
            description: payload.description,
            retranscription: payload.retranscription,
            date: payload.date,
            dateDeFin: payload.dateDeFin,
            personnes: payload.personnes,
            categories: payload.categories,
            villes: payload.villes
        }        
        await client.db("arca-metadata").collection("arca").insertOne(doc);

        
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

}
