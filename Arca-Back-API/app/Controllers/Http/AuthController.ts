import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterUserValidator from "App/Validators/RegisterUserValidator";
import User from "App/Models/User";
import LoginUserValidator from "App/Validators/LoginUserValidator";

export default class AuthController {

  public async register({auth, bouncer, request, response}: HttpContextContract){
    await auth.use('api').authenticate()
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
      const token = await auth.use('api').attempt(email, password,{
        expiresIn: '30 mins'
      })
      return token
    } catch {
      return response.unauthorized('Mauvais email ou mot de passe')
    }
  }

  public async logout({auth, response}){
    await auth.use('api').revoke()
    return response.status(200).json({message: 'Vous êtes déconnecté'})
  }

  public async isLoggedInAsAdmin({auth, response}) {
    await auth.use('api').authenticate()
    if (auth.user?.role === 'admin') {
      return response.status(200).json({message: 'Vous êtes connecté en tant qu\'administrateur'})
    } else {
      return response.status(200).json({message: 'Vous n\'êtes pas autorisé à accéder à cette ressource'})
    }
  }
}
