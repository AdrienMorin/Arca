import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateLocationValidator from "App/Validators/Location/CreateLocationValidator";
import UpdateLocationValidator from "App/Validators/Location/UpdateLocationValidator";
import Location from "App/Models/Location";

export default class LocationsController {

    public async createLocation({auth, bouncer, request, response}: HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('LocationPolicy').authorize('create')
        const payload = await request.validate(CreateLocationValidator)

        await Location.create({
            cityname: payload.cityname,
            regionname: payload.regionname,
            zipcode: payload.zipcode,
            country: payload.country,
            displayname: payload.cityname+ ', ' + payload.regionname + ', ' + payload.country
        })
        return response.status(200).json({message: 'Lieu créé avec succès'})
    }false


    public async fetchLocations({auth, bouncer, response}: HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('LocationPolicy').authorize('viewList')
        const allDocuments = await Location.query()
        return response.status(200).json(allDocuments)
    }

    public async getByName({auth, bouncer, request, response}: HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('LocationPolicy').authorize('viewList')
        const nameParam=request.param("name")
        const allDocuments = await Location.query().where('name', 'like', `%${nameParam}%`);
        return response.status(200).json(allDocuments)
    }

    public async getLocationById({auth, bouncer, request, response}: HttpContextContract) {
        await auth.use('api').authenticate()
        await bouncer.with('LocationPolicy').authorize('view')
        const location = await Location.findOrFail(request.param("id"))
        return response.status(200).json(location)
    }

    public async deleteLocation({auth, bouncer, request, response}: HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('LocationPolicy').authorize('delete')
        const id=request.body().id
        const location=await Location.findOrFail(id)
        await location.delete()
        return response.status(200).json({message:'Lieu supprimé avec succès'})
    }
}