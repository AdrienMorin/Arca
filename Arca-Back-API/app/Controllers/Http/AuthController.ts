import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterUserValidator from "App/Validators/User/RegisterUserValidator";
import User from "App/Models/User";
import LoginUserValidator from "App/Validators/Auth/LoginUserValidator";
import Redis from '@ioc:Adonis/Addons/Redis'


export default class AuthController {

  public async register({auth, bouncer, request, response}: HttpContextContract){
    await auth.use('api').authenticate()
    await bouncer.with('UserPolicy').authorize('createUser')
    let payload
    try{
      payload = await request.validate(RegisterUserValidator)
    }catch(e){
      console.log(e)
      return response.status(400).json({message: 'Données invalides'})
    }
    if (payload.role === null || payload.role === 'user') {
      try{
        await User.create(payload)
      }catch(e){
        console.log(e)
        if(e.code === '23505'){
          return response.status(400).json({message: 'Cet utilisateur existe déjà'})
        }else{
          return response.status(500).json({message: 'Erreur lors de la création de l\'utilisateur'})
        }
      }
    } else if (payload.role === 'admin') {
      await bouncer.with('UserPolicy').authorize('createAdmin')
      try{
        await User.create(payload)
      }catch(e){
        console.log(e)
        if(e.code === '23505'){
          return response.status(400).json({message: 'Cet utilisateur existe déjà'})
        }else{
          return response.status(500).json({message: 'Erreur lors de la création de l\'utilisateur'})
        }
      }
    } else {
      return response.status(400).json({message: 'Rôle invalide'})
    }
    return response.status(200).json({message: 'Nouvel utilisateur créé avec succès'})
  }

  public async login({auth, request, response}: HttpContextContract){
    const {email, password} = await request.validate(LoginUserValidator)
    try {
      console.log("attempting to login")
      const token = await auth.use('api').attempt(email, password,{
        expiresIn: '12 hours'
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
    try{
      await auth.use('api').authenticate()
      if (auth.user?.role === 'admin' || auth.user?.role === 'superuser') {
        return response.status(200).json({message: 'Vous êtes connecté en tant qu\'administrateur'})
      } else {
        return response.status(200).json({message: 'Vous n\'êtes pas autorisé à accéder à cette ressource'})
      }
    } catch (error) {
      return response.status(200).json({message: 'Vous n\'êtes pas connecté'})
    }

  }
}
