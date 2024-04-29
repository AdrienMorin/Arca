import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateDocumentValidator from "App/Validators/Document/CreateDocumentValidator";
import UpdateDocumentValidator from "App/Validators/UpdateDocumentValidator";
import Document from "App/Models/Document";
import Drive from '@ioc:Adonis/Core/Drive';
import fs from 'fs';

export default class DocumentsController {

    public async createDocument({auth, bouncer, request, response}: HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('DocumentPolicy').authorize('create')
        const payload = await request.validate(CreateDocumentValidator)
        
        const doc = await Document.create({
            name:payload.name,
            description:payload.description,
            filename:"",
            location:payload.location,
            category:payload.category,
            date:payload.date,
            creator:auth.user!.id,
            lastmodifier:auth.user!.id
        })
        const fileName=doc.id.toString()+"."+payload.file.extname
        doc.filename=fileName
        await doc.save()

        if (payload.file.tmpPath) {
            console.log(payload.file.tmpPath)
            const buffer = fs.readFileSync(payload.file.tmpPath);
            await Drive.put(fileName ,buffer)
            return response.status(200).json({message: 'Document créé avec succès'})
        } else {
            console.log('Le fichier n\'a pas été déplacé à un emplacement temporaire');
        }

        await doc.related('persons').attach(payload.persons)
        return response.status(200).json({message: 'Document créé avec succès'})

    }

    public async updateDocument({auth, bouncer, request, response}:HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('DocumentPolicy').authorize('update')
        const payload = await request.validate(UpdateDocumentValidator)
        const document=await Document.findOrFail(request.param("id"))
        let fileName
        if(payload.file){
            await Drive.delete(document.filename)
            await payload.file.moveToDisk('./')
            fileName=payload.file.fileName
        }

        const updatedDoc=await document.merge(
            {
                name:payload.name,
                description:payload.description,
                filename:fileName,
                location:payload.location,
                category:payload.category,
                date:payload.date,
                lastmodifier:auth.user!.id
            }
        ).save()
        await updatedDoc.related('persons').sync(payload.persons)
        return response.status(200).json({message:'Document mis à jour avec succès'})
    }

    public async fetchDocuments({auth, bouncer, response}: HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('DocumentPolicy').authorize('viewList')
        const allDocuments = await Document.query()
        return response.status(200).json(allDocuments)
    }

    public async getByName({auth, bouncer, request, response}: HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('DocumentPolicy').authorize('viewList')
        const nameParam=request.param("name")
        const allDocuments = await Document.query().where('name', 'like', `%${nameParam}%`);
        return response.status(200).json(allDocuments)
    }

    public async getDocumentById({auth, bouncer, request, response}: HttpContextContract) {
        await auth.use('api').authenticate()
        await bouncer.with('DocumentPolicy').authorize('view')
        const user = await Document.findOrFail(request.param("id"))
        return response.status(200).json(user)
    }

    public async deleteDocumentById({auth, bouncer, request, response}: HttpContextContract) {
        await auth.use('api').authenticate()
        await bouncer.with('DocumentPolicy').authorize('delete')
        try {
            const documentId = request.body().id
            const document = await Document.findOrFail(documentId)
            await document.delete()
            return response.status(200).json({message: 'Document supprimé avec succès'})
        } catch (error) {
            return response.status(400).json({message: 'Une erreur est survenue lors de la suppression du document'})
        }

    }

    public async downloadDocumentById({auth, bouncer, request, response}: HttpContextContract) {
        await auth.use('web').authenticate()
        await bouncer.with('DocumentPolicy').authorize('download')
        const document = await Document.findOrFail(request.param("id"))
        const content= await Drive.get(document.filename)
        const text=content.toString()
        return response.status(200).json(text)
    }
}
