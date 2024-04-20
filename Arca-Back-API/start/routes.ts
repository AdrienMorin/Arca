/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

// Protected route group by authentication
Route.group(() => {
  // Auth routes
  Route.post("/auth/register", 'AuthController.register')

  Route.post('/auth/logout', 'AuthController.logout')

  // Admin pages
  Route.post('/deleteUser', 'UsersController.deleteUserById')

  // User page
  Route.get('/getUser', 'UsersController.getLoggedUser')

  Route.get('/getUser/:id', 'UsersController.getUserById')

  Route.get("/fetchUsers", 'UsersController.fetchUsers')

}).prefix("/api").middleware('auth')

// Unprotected routes
Route.group( () => {
  // Index page
  Route.get('/', async ({auth}: HttpContextContract) => {
    await auth.use('web').authenticate()
    if(auth.use('web').isLoggedIn){
      return "Vous êtes connecté"
    } else {
      return "Veuillez vous connecter pour pouvoir accéder à l'application"
    }

  })

  // Login page
  Route.post("/api/auth/login", 'AuthController.login')
})






