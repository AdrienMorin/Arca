import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePersonValidator from "App/Validators/Person/CreatePersonValidator";
import UpdatePersonValidator from "App/Validators/Person/UpdatePersonValidator";
import Person from "App/Models/Person";

export default class PeopleController {

    public async createPerson({auth, bouncer, request, response}: HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('PersonPolicy').authorize('create')
        const payload = await request.validate(CreatePersonValidator)
        const displayname = payload.firstname + ' ' + payload.lastname
        const first = payload.firstname.replace(/-/g, " ").toLowerCase();
        const lastname = payload.lastname.replace(/-/g, " ").toLowerCase()
        await Person.create({
            displayname: displayname,
            firstname: first,
            lastname: lastname,
            role: payload.role,
            location: payload.location
        })
        return response.status(200).json({message: 'Personne créée avec succès'})
    }

    public async updatePerson({auth, bouncer, request, response}:HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('PersonPolicy').authorize('update')
        const payload = await request.validate(UpdatePersonValidator)
        const displayname = payload.firstname + ' ' + payload.lastname
        const firstname = payload.firstname.toLowerCase().replace("-", " ")
        const lastname = payload.lastname.toLowerCase()
        const document=await Person.findOrFail(request.param("id"))
        await document.merge({
            displayname: displayname,
            firstname: firstname,
            lastname: lastname,
            role: payload.role,
            location: payload.location
        }).save()
        return response.status(200).json({message:'Personne mise à jour avec succès'})

    }

    public async fetchPeople({auth, bouncer, response}: HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('PersonPolicy').authorize('viewList')
        const allDocuments = await Person.query()
        return response.status(200).json(allDocuments)
    }

    public async getByName({auth, bouncer, request, response}: HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('PersonPolicy').authorize('viewList')
        const nameParam=request.param("name")
        const allDocuments = await Person.query().where('name', 'like', `%${nameParam}%`);
        return response.status(200).json(allDocuments)
    }

    public async getPersonById({auth, bouncer, request, response}: HttpContextContract) {
        await auth.use('api').authenticate()
        await bouncer.with('PersonPolicy').authorize('view')
        const user = await Person.findOrFail(request.param("id"))
        return response.status(200).json(user)
    }

    public async deletePersonById({auth, bouncer, request, response}: HttpContextContract) {
        await auth.use('api').authenticate()
        await bouncer.with('PersonPolicy').authorize('delete')
        try {
            const documentId = request.body().id
            const document = await Person.findOrFail(documentId)
            await document.delete()
            return response.status(200).json({message: 'Personne supprimée avec succès'})
        } catch (error) {
            return response.status(400).json({message: 'Une erreur est survenue lors de la suppression de la personne'})
        }

    }
}
