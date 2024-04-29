import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterUserValidator from "App/Validators/RegisterUserValidator";
import User from "App/Models/User";
import LoginUserValidator from "App/Validators/LoginUserValidator";

export default class AuthController {

  public async register({auth, bouncer, request, response}: HttpContextContract){
    await auth.use('web').authenticate()
    await bouncer.with('UserPolicy').authorize('createUser')
    const payload = await request.validate(RegisterUserValidator)
    if (payload.role === null || payload.role === 'user') {
      await User.create(payload)
    } else if (payload.role === 'admin') {
      await bouncer.with('UserPolicy').authorize('createAdmin')
      await User.create(payload)
    } else {
      return response.status(400).json({message: 'Rôle invalide'})
    }
    return response.status(200).json({message: 'Nouvel utilisateur créé avec succès'})
  }

  public async login({auth, request, response}: HttpContextContract){
    const {email, password} = await request.validate(LoginUserValidator)
    try {
      const authentication = await auth.use('web').attempt(email, password)

      if (authentication) {
        return response.status(200).json({isAuthenticated: true})
      } else {
        return response.badRequest('Informations d\'authentification incorrectes')
      }
    } catch (error) {
      return response.badRequest('Une erreur est survenue pendant l\'authentification')
    }
  }

  public async logout({auth, response}){
    await auth.use('web').logout()
    response.redirect('/api/')
  }
}
