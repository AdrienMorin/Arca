import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

// Protected route group by authentication
Route.group(() => {
  // Auth routes
  Route.post("/auth/register", 'AuthController.register')
  Route.post('/auth/logout', 'AuthController.logout')

  // Admin routes
  Route.post('/deleteUser', 'UsersController.deleteUserById')

  // User routes
  Route.get('/user/getUser', 'UsersController.getLoggedUser')
  Route.get('/user/getUser/:id', 'UsersController.getUserById')
  Route.get("/user/fetchUsers", 'UsersController.fetchUsers')
  Route.post('/user/changePassword', 'UsersController.changeUserPassword')
  Route.post('/user/changePasswordById', 'UsersController.changeUserPasswordById')

  // Person routes
  Route.post('/person/create', 'PeopleController.createPerson')
  Route.get('/person/fetchPeople', 'PeopleController.fetchPeople')
  Route.get('/person/getPerson/:id', 'PeopleController.getPersonById')
  Route.get('/person/getByName/:name', 'PeopleController.getByName')
  Route.post('/person/update/:id', 'PeopleController.updatePerson')

  // Location routes
  Route.post('/location/create', 'LocationsController.createLocation')
  Route.get('/location/fetchLocations', 'LocationsController.fetchLocations')
  Route.get('/location/getLocation/:id', 'LocationsController.getLocationById')
  Route.get('/location/getByName/:name', 'LocationsController.getByName')
  Route.post('/location/delete', 'LocationsController.deleteLocation')

  // Category routes
  Route.post('/category/create', 'CategoriesController.createCategory')
  Route.get('/category/fetchCategories', 'CategoriesController.fetchCategories')
  Route.get('/category/getCategory/:id', 'CategoriesController.getCategoryById')
  Route.get('/category/getByName/:name', 'CategoriesController.getByName')
  Route.post('/category/update', 'CategoriesController.updateCategory')

  // AI routes
  Route.post('/ai/upload', 'UploadDocsController.uploadDocAi')
  Route.get('/ai/getDocs', 'GetDocsController.getOldestDocuments')
  Route.post('/ai/get', 'GetDocsController.getDocReview')

  // Upload routes
  Route.post('/basic/upload', 'UploadDocsController.uploadDoc')
  Route.post('/basic/update', 'UploadDocsController.updateDocContentOnS3')
  Route.post('/basic/get', 'GetDocsController.getDoc')
  Route.post('/search', 'SearchDocsController.advancedSearch')
  Route.post('/updateDocuments/:id', 'UploadDocsController.updateDoc')
  Route.post('/transferDocumentById/:id', 'UploadDocsController.transferDocumentById')


  // A passer en admin
  Route.post('/deleteArca', 'DeleteDocsController.deleteDocumentArca')
  Route.post('/deleteReview', 'DeleteDocsController.deleteDocumentReview')
  Route.post('/documents/transfer', 'UploadDocsController.transferDocumentById')

}).prefix("/api").middleware('auth')

// Unprotected routes
Route.group(() => {
  // Index route
  Route.get('/', async ({ auth }: HttpContextContract) => {
    try {
      await auth.use('api').authenticate()
      if (auth.use('api').isLoggedIn) {
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
  Route.get('/auth/isLoggedInAsAdmin', 'AuthController.isLoggedInAsAdmin')

}).prefix("/api")