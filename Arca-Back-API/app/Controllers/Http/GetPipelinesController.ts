import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://hexanomedufutur:LCQbwYjD0LLaTxRW@arca-metadata-storage.qp6278d.mongodb.net/";
import Drive from '@ioc:Adonis/Core/Drive';
import fs from 'fs';
import GetPipelineValidator from 'App/Validators/Pipelines/GetPipelineValidator';

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
        console.log("s3_name "+s3_name)
        const contents = await Drive.get(s3_name);

        const tempFolderPath = '../Arca-Front/temp'; 
        const tempFilePath = `${tempFolderPath}/${s3_name}`;
        fs.writeFileSync(tempFilePath, contents);
        //console.log("contents "+contents)
    
        return response.status(200).json({message: 'Document récupéré avec succès'})
        
    }

}
