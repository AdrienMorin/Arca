import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://hexanomedufutur:LCQbwYjD0LLaTxRW@arca-metadata-storage.qp6278d.mongodb.net/";
import Drive from '@ioc:Adonis/Core/Drive';
import fs from 'fs';
import BasicUploadPipelineValidator from 'App/Validators/Pipelines/BasicUploadPipelineValidator';
import CreateAiDocumentValidator from 'App/Validators/Pipelines/CreateAiDocumentValidator';
import ModifyDocValidator from 'App/Validators/Pipelines/ModifyDocValidator';
import axios from 'axios';
const https = require('https');
import Env from '@ioc:Adonis/Core/Env';
import S3FileUpdateValidator from 'App/Validators/Pipelines/S3FileUpdateValidator';


const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
    }
});

const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false // Ignore certificate verification errors
    })
});

export default class UploadDocsController {

    public async uploadDoc({ auth,bouncer,response,request}:HttpContextContract){   
        await auth.use('api').authenticate()
        await bouncer.with('AiPolicy').authorize('create')

        await client.connect();
        await client.db("admin").command({ ping: 1 });
        const payload = await request.validate(BasicUploadPipelineValidator)    
        const _id = Math.random().toString(36).substr(2) + Date.now().toString(36);
        const docId = await client.db("arca-metadata").collection("arca").findOne({_id: _id})
        const docIdReview = await client.db("reviewDB").collection("review").findOne({_id: _id})
        if(docId || docIdReview){
            return response.status(500).json({message: 'Erreur lors de la création du document, veuillez réessayer'})
        }
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
            author: auth.user?.lastname + ' '+auth.user?.firstname,
            date: payload.date.start,
            endDate: payload.date.end,
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

    public async updateDocContentOnS3({ auth, response, request }: HttpContextContract) {
        await auth.use('api').authenticate();

        const validatedData = await request.validate(S3FileUpdateValidator);
        const { fileName, file } = validatedData;

        if (file.tmpPath) {
            console.log(`Updating file content for: ${fileName}`);
            const buffer = fs.readFileSync(file.tmpPath);
            await Drive.put(fileName, buffer);
            return response.status(200).json({ message: 'Document content updated successfully' });
        } else {
            console.error('No temporary file path provided, unable to update document content.');
            return response.status(400).json({ message: 'Temporary file path is required' });
        }
    }


    public async uploadDocAi({ auth,bouncer,response,request}:HttpContextContract){
            
        await auth.use('api').authenticate()
        await bouncer.with('AiPolicy').authorize('create')
    
        await client.connect();
        await client.db("admin").command({ ping: 1 });

        const payload = await request.validate(CreateAiDocumentValidator)
        const _id = Math.random().toString(36).substr(2) + Date.now().toString(36);
        const docId = await client.db("arca-metadata").collection("arca").findOne({_id: _id})
        const docIdReview = await client.db("reviewDB").collection("review").findOne({_id: _id})
        if(docId || docIdReview){
            return response.status(500).json({message: 'Erreur lors de la création du document, veuillez réessayer'})
        }
        const extension = payload.file.extname
        const fileName= _id+'.'+extension
        const type = this.findType(extension!)

        
        const doc={
            name: payload.file.clientName,
            createdBy: auth.user?.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            updatedBy: auth.user?.id,
            type: type,
            author: "Retranscription automatique",
        }

        if (payload.file.tmpPath) {
            console.log(payload.file.tmpPath)
            const buffer = fs.readFileSync(payload.file.tmpPath);
            await Drive.put(fileName ,buffer)
        } else {
            console.log('Le fichier n\'a pas été déplacé à un emplacement temporaire');
        }

        //appel à une api, parametre :  _id et filename, adresse ip aws 51.20.109.232
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
        }).catch(error => {
            console.error('Error:', error);
        });
        console.log(worked)

        if(worked==0){
            await Drive.delete(fileName)
            await client.db("reviewDB").collection("review").deleteOne({_id: _id})
            return response.status(500).json({message: 'Erreur lors de la création du document'})
        }else if(worked==1){
            await client.db("reviewDB").collection("review").updateOne({_id: _id}, {$set: doc});
        }
        return response.status(200).json({message: 'Document créé avec succès'})
        
        }

    public async updateDoc({ auth, response, request }: HttpContextContract) {
        await auth.use('api').authenticate();
    
        await client.connect();
        await client.db("admin").command({ ping: 1 });
    
        const docId = request.param("id");
        const payload = await request.validate(ModifyDocValidator);
    
        let updateData = {
            updatedAt: new Date(),
            updatedBy: auth.user?.lastname + ' ' + auth.user?.firstname,
        };
    
        if (payload.titre) {
            updateData['name'] = payload.titre;
        }
        if (payload.description !== undefined) {
            updateData['description'] = payload.description;
        }
        if (payload.retranscription !== undefined) {
            updateData['retranscription'] = payload.retranscription;
            updateData['author'] = auth.user?.lastname + ' ' + auth.user?.firstname;
        }
        if (payload.date) {
            updateData['date'] = payload.date;
        }
        if (payload.dateDeFin) {
            updateData['endDate'] = payload.dateDeFin;
        }
        if (payload.personnes) {
            updateData['people'] = payload.personnes.split(';');
        }
        if (payload.categories) {
            updateData['categories'] = payload.categories;
        }
        if (payload.villes) {
            updateData['towns'] = payload.villes.split(';');
        }
        
        const targetDatabase = payload.mongoDB === "ntbr" ? "arca-metadata" : "reviewDB";
        const targetCollection = payload.mongoDB === "ntbr" ? "arca" : "review";
        
        try {
            const result = await client.db(targetDatabase).collection(targetCollection).updateOne(
                { _id: docId },
                { $set: updateData }
            );
    
            if (result.matchedCount === 0) {
                return response.status(404).json({ message: 'No document found with the provided ID.' });
            }
    
            return response.status(200).json({ message: 'Document updated successfully.' });
        } catch (error) {
            console.error('Error updating document:', error);
            return response.status(500).json({ message: 'Failed to update document.', error });
        }
    }

    public async transferDocumentById({ request, response }: HttpContextContract) {
        await client.connect();
        const docId = request.input('documentId');
        const session = client.startSession();
    
        try {
            session.startTransaction();
            const reviewCollection = client.db("reviewDB").collection("review");
            const documentToMove = await reviewCollection.findOne({ _id: docId }, { session });
    
            if (!documentToMove) {
                await session.abortTransaction();
                return response.status(404).json({ message: 'Document not found in the review database.' });
            }
    
            await reviewCollection.deleteOne({ _id: docId }, { session });
    
            const arcaCollection = client.db("arca-metadata").collection("arca");
            await arcaCollection.insertOne(documentToMove, { session });
            await session.commitTransaction();
    
            return response.status(200).json({ message: 'Document transferred successfully.' });
        } catch (error) {
            console.error('Error during document transfer:', error);
            if (session.inTransaction()) {
                await session.abortTransaction();
            }
            return response.status(500).json({ message: 'Failed to transfer document.', error });
        } finally {
            session.endSession();
        }
    }

    public findType(extension: string) {
        let type: string

        if(extension=='pdf'){
            type='pdf'
        }else if(extension=='docx'){
            type='word'
        }else if(extension=='pptx'){
            type='powerpoint'
        }else if(extension=='xlsx'){
            type='excel'
        }else if(extension=='jpg' || extension=='jpeg' || extension=='png'){
            type='image'
        }else if(extension=='mp4' || extension=='avi' || extension=='mov' || extension=='mkv'){
            type='video'
        }else if(extension=='mp3' || extension=='wav' || extension=='aac'){
            type='audio'
        }else{
            type='other'
        }
        return type
    }

}