import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterUserValidator from "App/Validators/RegisterUserValidator";
import User from "App/Models/User";
import LoginUserValidator from "App/Validators/LoginUserValidator";

export default class AuthController {

  public async register({auth, bouncer, request, response}: HttpContextContract){
    await auth.use('web').authenticate()
    await bouncer.with('UserPolicy').authorize('create')
    const payload = await request.validate(RegisterUserValidator)
    await User.create(payload)
    return response.status(200).json({message: 'Utilisateur créé avec succès'})
  }

  public async login({auth, request, response}: HttpContextContract){
    const {email, password} = await request.validate(LoginUserValidator)
    try {
      const authentication = await auth.use('web').attempt(email, password)
      console.log(authentication)

      if (authentication) {
        return response.status(200).json({isAuthenticated: true})
      } else {
        return response.badRequest('Invalid credentials')
      }
    } catch (error) {
      console.error(error)
      return response.badRequest('An error occurred during authentication')
    }
  }

  public async logout({auth, response}){
    await auth.use('web').logout()
    response.redirect('/api/')
  }
}
