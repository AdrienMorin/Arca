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

        console.log("done")
        return response.status(200).json({message: 'Document récupéré avec succès'})
        
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

    public async deleteDocumentArca({ request, response }: HttpContextContract) {
        const filename = request.input('filename');
        var ok = true;
        if (!filename) {
            ok = false
        }

        // S3 deletion
        try {
            await Drive.delete(filename);
        } catch (error) {
            console.error('S3 Deletion Error:', error);
            ok = false
        }

        // MongoDB deletion
        try {
            await client.connect();
            const dbResponse = await client.db("arca-metadata").collection("arca").deleteOne({ filename: filename });
            if (dbResponse.deletedCount === 0) {
                ok = false
            }
        } catch (error) {
            console.error('MongoDB Deletion Error:', error);
            ok = false
        } finally {
            await client.close();
        }

        if(!ok)
            return response.status(500).json({ message: 'Erreur' });
        return response.json({ message: 'Document and file deleted successfully' });
    }

    public async deleteDocumentReview({ request, response }: HttpContextContract) {
        const filename = request.input('filename');
        var ok = true;
        if (!filename) {
            ok = false
        }

        // S3 deletion
        try {
            await Drive.delete(filename);
        } catch (error) {
            console.error('S3 Deletion Error:', error);
            ok = false
        }

        // MongoDB deletion
        try {
            await client.connect();
            const dbResponse = await client.db("reviewDB").collection("review").deleteOne({ filename: filename });
            if (dbResponse.deletedCount === 0) {
                ok = false
            }
        } catch (error) {
            console.error('MongoDB Deletion Error:', error);
            ok = false
        } finally {
            await client.close();
        }

        if(!ok)
            return response.status(500).json({ message: 'Erreur' });
        return response.json({ message: 'Document and file deleted successfully' });
    }

}
