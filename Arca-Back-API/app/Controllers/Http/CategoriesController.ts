import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CreateCategoryValidator from 'App/Validators/Category/CreateCategoryValidator'
import UpdateCategoryValidator from 'App/Validators/Category/UpdateCategoryValidator'

export default class CategoriesController {
    public async createCategory({auth, bouncer, request, response}: HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('CategoryPolicy').authorize('create')
        const payload = await request.validate(CreateCategoryValidator)
        await Category.create(payload)
        return response.status(200).json({message: 'Catégorie créée avec succès'})
    }

    public async updateCategory({auth, bouncer, request, response}:HttpContextContract){
        await auth.use('api').authenticate()
        await bouncer.with('CategoryPolicy').authorize('update')
        const payload = await request.validate(UpdateCategoryValidator)
        const document= await Category.findByOrFail('name', payload.oldName)
        await document.merge({
            name: payload.newName
        }).save()
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
