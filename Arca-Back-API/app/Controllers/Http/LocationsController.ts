import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateLocationValidator from "App/Validators/Location/CreateLocationValidator";
import UpdateLocationValidator from "App/Validators/Location/UpdateLocationValidator";
import Location from "App/Models/Location";

export default class LocationsController {

    public async createLocation({auth, bouncer, request, response}: HttpContextContract){
        await auth.use('web').authenticate()
        await bouncer.with('LocationPolicy').authorize('create')
        const payload = await request.validate(CreateLocationValidator)
        await Location.create(payload)
        return response.status(200).json({message: 'Lieu créé avec succès'})
    }

    public async updateLocation({auth, bouncer, request, response}:HttpContextContract){
        await auth.use('web').authenticate()
        await bouncer.with('LocationPolicy').authorize('update')
        const payload = await request.validate(UpdateLocationValidator)
        const document=await Location.findOrFail(request.param("id"))
        await document.merge(payload).save()

        return response.status(200).json({message:'Location updated'})

    }

    public async fetchLocations({auth, bouncer, response}: HttpContextContract){
        await auth.use('web').authenticate()
        await bouncer.with('LocationPolicy').authorize('viewList')
        const allDocuments = await Location.query()
        return response.status(200).json(allDocuments)
    }

    public async getByName({auth, bouncer, request, response}: HttpContextContract){
        await auth.use('web').authenticate()
        await bouncer.with('LocationPolicy').authorize('viewList')
        const nameParam=request.param("name")
        const allDocuments = await Location.query().where('name', 'like', `%${nameParam}%`);
        return response.status(200).json(allDocuments)
    }

    public async getLocationById({auth, bouncer, request, response}: HttpContextContract) {
        await auth.use('web').authenticate()
        await bouncer.with('LocationPolicy').authorize('view')
        const user = await Location.findOrFail(request.param("id"))
        return response.status(200).json(user)
    }



    public async deleteLocationById({auth, bouncer, request, response}: HttpContextContract) {
        await auth.use('web').authenticate()
        await bouncer.with('LocationPolicy').authorize('delete')
        try {
            const documentId = request.body().id
            const document = await Location.findOrFail(documentId)
            await document.delete()
            return response.status(200).json({message: 'Lieu supprimé avec succès'})
        } catch (error) {
            return response.status(400).json({message: 'Une erreur est survenue lors de la suppression du lieu'})
        }

    }
}
