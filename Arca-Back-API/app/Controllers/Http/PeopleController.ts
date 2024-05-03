import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePersonValidator from "App/Validators/Person/CreatePersonValidator";
import UpdatePersonValidator from "App/Validators/Person/UpdatePersonValidator";
import Person from "App/Models/Person";
import Database from '@ioc:Adonis/Lucid/Database'


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
        const allDocuments = await Database
            .from('people')
            .join('locations', 'people.location', '=', 'locations.id')
            .select('people.*')
            .select('locations.displayname as location')

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

}
