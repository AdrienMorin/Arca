import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateLocationValidator from "App/Validators/Location/CreateLocationValidator";
import Location from "App/Models/Location";

export default class LocationsController {

    public async createLocation({auth, bouncer, request, response}: HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('LocationPolicy').authorize('create')
        const payload = await request.validate(CreateLocationValidator)
        try{
            await Location.create({
                cityname: payload.cityname,
                regionname: payload.regionname,
                zipcode: payload.zipcode,
                country: payload.country,
                displayname: payload.cityname+ ', ' + payload.regionname + ', ' + payload.country
            })
        }catch (error){
            if(error.code === '23505'){
                return response.status(400).json({message: 'Lieu déjà existant', error: error})
            }else{
                return response.status(500).json({message: 'Erreur lors de la création du lieu', error: error})
            }
        }

        return response.status(200).json({message: 'Lieu créé avec succès'})
    }


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