import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateDocumentValidator from "App/Validators/CreateDocumentValidator";
import UpdateDocumentValidator from "App/Validators/UpdateDocumentValidator";
import Document from "App/Models/Document";

export default class DocumentsController {

    public async createDocument({auth, bouncer, request, response}: HttpContextContract){
        await auth.use('web').authenticate()
        await bouncer.with('DocumentPolicy').authorize('create')
        const payload = await request.validate(CreateDocumentValidator)
        await Document.create(payload)
        return response.status(200).json({message: 'Document créé avec succès'})
    }

    public async updateDocument({auth, bouncer, request, response}:HttpContextContract){
        await auth.use('web').authenticate()
        await bouncer.with('DocumentPolicy').authorize('update')
        const payload = await request.validate(UpdateDocumentValidator)
        const document=await Document.findOrFail(request.param("id"))
        await document.merge(payload).save()

        return response.status(200).json({message:'Document updated'})

        

    }

    public async fetchDocuments({auth, bouncer, response}: HttpContextContract){
        await auth.use('web').authenticate()
        await bouncer.with('DocumentPolicy').authorize('viewList')
        const allDocuments = await Document.query()
        return response.status(200).json(allDocuments)
    }

    public async getByName({auth, bouncer, request, response}: HttpContextContract){
        await auth.use('web').authenticate()
        await bouncer.with('DocumentPolicy').authorize('viewList')
        const nameParam=request.param("name")
        const allDocuments = await Document.query().where('name', 'like', `%${nameParam}%`);
        return response.status(200).json(allDocuments)
    }

    public async getDocumentById({auth, bouncer, request, response}: HttpContextContract) {
        await auth.use('web').authenticate()
        await bouncer.with('DocumentPolicy').authorize('view')
        const user = await Document.findOrFail(request.param("id"))
        return response.status(200).json(user)
    }



    public async deleteDocumentById({auth, bouncer, request, response}: HttpContextContract) {
        await auth.use('web').authenticate()
        await bouncer.with('UserPolicy').authorize('delete')
        try {
            const documentId = request.body().id
            const document = await Document.findOrFail(documentId)
            await document.delete()
            return response.status(200).json({message: 'Document supprimé avec succès'})
        } catch (error) {
            return response.status(400).json({message: 'Une erreur est survenue lors de la suppression du document'})
        }

    }


}
