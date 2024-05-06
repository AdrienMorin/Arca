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
        console.log(payload);
        const displayname = payload.firstname + ' ' + payload.lastname
        const first = payload.firstname.replace(/-/g, " ").toLowerCase();
        const lastname = payload.lastname.replace(/-/g, " ").toLowerCase()

        try{
            await Person.create({
            displayname: displayname,
            firstname: first,
            lastname: lastname,
            role: payload.role,
            location: payload.location
            })
        }catch(e){
            console.log(e)
            if(e.code === '23505'){
                return response.status(400).json({message: 'Cette personne existe déjà'})
            }else{
                return response.status(500).json({message: 'Erreur lors de la création de la personne'})
            }
        }

        return response.status(200).json({message: 'Personne créée avec succès'})
    }

    public async updatePerson({auth, bouncer, request, response}:HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('PersonPolicy').authorize('update')
        const payload = await request.validate(UpdatePersonValidator)
        const displayname = payload.firstname + ' ' + payload.lastname
        const firstname = payload.firstname.toLowerCase().replace("-", " ")
        const lastname = payload.lastname.toLowerCase()
        let document
        try{
            document=await Person.findOrFail(request.param("id"))
        }catch(e){
            return response.status(404).json({message: 'Personne non trouvée'})
        }
        try{
            await document.merge({
                displayname: displayname,
                firstname: firstname,
                lastname: lastname,
                role: payload.role,
                location: payload.location
            }).save()
         }catch(e){
            console.log(e)
            if(e.code === '23505'){
                return response.status(400).json({message: 'Cette personne existe déjà'})
            }else{
                return response.status(500).json({message: 'Erreur lors de la mise à jour de la personne'})
            }
        }
        return response.status(200).json({message:'Personne mise à jour avec succès'})

    }

    public async fetchPeople({auth, bouncer, response}: HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('PersonPolicy').authorize('viewList')
        const allDocuments = await Database
            .from('people')
            .leftJoin('locations', 'people.location', '=', 'locations.id')
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
