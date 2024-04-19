// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UsersController {
    public async fetchUsers({response}: HttpContextContract){
        const allUsers = await User.query()
        return response.status(200).json(allUsers)
    }

    public async getLoggedUser({auth, response}: HttpContextContract) {
        await auth.use('web').authenticate()
        return response.status(200).json(auth.use('web').user!)
    }

    public async getUserById({auth, response}: HttpContextContract) {
        await auth.use('web').authenticate()
        return response.status(200).json(auth.use('web').user!)
    }
}
