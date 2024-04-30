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

  // Admin routes
  Route.post('/deleteUser', 'UsersController.deleteUserById')

  // User routes
  Route.get('/getUser', 'UsersController.getLoggedUser')

  Route.get('/getUser/:id', 'UsersController.getUserById')

  Route.get("/fetchUsers", 'UsersController.fetchUsers')

  Route.post('/changePassword', 'UsersController.changeUserPassword')

  Route.post('/changePasswordById', 'UsersController.changeUserPasswordById')

  // Document routes

  Route.post('/document/create', 'DocumentsController.createDocument')

  Route.post('/document/delete', 'DocumentsController.deleteDocumentById')

  Route.get('/document/fetchDocuments', 'DocumentsController.fetchDocuments')

  Route.get('/document/getDocument/:id', 'DocumentsController.getDocumentById')

  Route.get('/document/getByName/:name','DocumentsController.getByName')

  Route.put('/document/update/:id', 'DocumentsController.updateDocument')

  Route.get('/document/download/:id', 'DocumentsController.downloadDocumentById')


  // Person routes

  Route.post('/person/create', 'PeopleController.createPerson')

  Route.post('/person/delete', 'PeopleController.deletePersonById')

  Route.get('/person/fetchPeople', 'PeopleController.fetchPeople')

  Route.get('/person/getPerson/:id', 'PeopleController.getPersonById')

  Route.get('/person/getByName/:name','PeopleController.getByName')

  Route.put('/person/update/:id', 'PeopleController.updatePerson')

  // Location routes

  Route.post('/location/create', 'LocationsController.createLocation')

  Route.post('/location/delete', 'LocationsController.deleteLocationById')

  Route.get('/location/fetchLocations', 'LocationsController.fetchLocations')

  Route.get('/location/getLocation/:id', 'LocationsController.getLocationById')

  Route.get('/location/getByName/:name','LocationsController.getByName')

  Route.put('/location/update/:id', 'LocationsController.updateLocation')

  // Category routes

  Route.post('/category/create', 'CategoriesController.createCategory')

  Route.post('/category/delete', 'CategoriesController.deleteCategoryById')

  Route.get('/category/fetchCategories', 'CategoriesController.fetchCategories')

  Route.get('/category/getCategory/:id', 'CategoriesController.getCategoryById')

  Route.get('/category/getByName/:name','CategoriesController.getByName')

  Route.put('/category/update/:id', 'CategoriesController.updateCategory')

}).prefix("/api").middleware('auth')

// Unprotected routes
Route.group( () => {
  // Index route
  Route.get('/', async ({auth}: HttpContextContract) => {
    try {
      await auth.use('api').authenticate()
      if(auth.use('api').isLoggedIn){
        return "Vous êtes connecté"
      } else {
        return "Veuillez vous connecter pour pouvoir accéder à l'application"
      }
    } catch (error) {
      return "Veuillez vous connecter pour pouvoir accéder à l'application"
    }

  })

  // Login route
  Route.post("/auth/login", 'AuthController.login')

    //Mongo DB routes, ici juste le temps que les évolutions du back soient terminées
    Route.get('/run','MongoDbsController.run')
    Route.get('/listDatabases','MongoDbsController.listDatabases')
    Route.post('/createDocument','MongoDbsController.createDocument')
    Route.post( '/findOneListingById','MongoDbsController.findOneListingById')


}).prefix("/api")






