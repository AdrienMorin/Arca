import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CreateCategoryValidator from 'App/Validators/Category/CreateCategoryValidator'
import UpdateCategoryValidator from 'App/Validators/Category/UpdateCategoryValidator'

export default class CategoriesController {
    public async createCategory({auth, bouncer, request, response}: HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('CategoryPolicy').authorize('create')
        const payload = await request.validate(CreateCategoryValidator)
        try{
            await Category.create(payload)
        }catch(e){
            console.log(e)
            if(e.code === '23505'){
                return response.status(400).json({message: 'Cette catégorie existe déjà'})
            }else{
                return response.status(500).json({message: 'Erreur lors de la création de la catégorie'})
            }
        }

        return response.status(200).json({message: 'Catégorie créée avec succès'})
    }

    public async updateCategory({auth, bouncer, request, response}:HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('CategoryPolicy').authorize('update')
        const payload = await request.validate(UpdateCategoryValidator)
        let document
        try{
            document= await Category.findByOrFail('name', payload.oldName)
        }catch(e){
            return response.status(404).json({message: 'Catégorie non trouvée'})
        }
        try{
            await document.merge({
                name: payload.newName
            }).save()
        }catch(e){
            console.log(e)
            if(e.code === '23505'){
                return response.status(400).json({message: 'Cette catégorie existe déjà'})
            }else{
                return response.status(500).json({message: 'Erreur lors de la mise à jour de la catégorie'})
            }
        }
        
        return response.status(200).json({message:'Catégorie mise à jour avec succès'})
    }

    public async fetchCategories({auth, bouncer, response}: HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('CategoryPolicy').authorize('viewList')
        const allDocuments = await Category.query()
        return response.status(200).json(allDocuments)
    }

    public async getByName({auth, bouncer, request, response}: HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('CategoryPolicy').authorize('viewList')
        const nameParam=request.param("name")
        const allDocuments = await Category.query().where('name', 'like', `%${nameParam}%`);
        return response.status(200).json(allDocuments)
    }

    public async getCategoryById({auth, bouncer, request, response}: HttpContextContract) {
        await auth.use('api').authenticate()
        await bouncer.with('CategoryPolicy').authorize('view')
        const user = await Category.findOrFail(request.param("id"))
        return response.status(200).json(user)
    }

}
