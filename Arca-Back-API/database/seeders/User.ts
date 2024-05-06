import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from "App/Models/User";

export default class extends BaseSeeder {
  public async run () {
    await User.createMany([
    {
      "firstname": "Super",
      "lastname": "User",
      "email": "superuser@gmail.com",
      "password": "superuser",
      "role": "superuser"
    },
    {
      "firstname": "Christiane",
      "lastname": "Coste",
      "email": "christiane.coste@gmail.com",
      "password": "christianecoste1944",
      "role": "admin"
    },
    {
      "firstname": "Jean-Marc",
      "lastname": "Sarnin",
      "email": "jean-marc.sarnin@gmail.com",
      "password": "jeanmarcsarnin1944",
      "role": "admin"
    },
    {
      "firstname": "Françoise",
      "lastname": "Desloges",
      "email": "francoise.desloges@gmail.com",
      "password": "francoisedesloges1944",
      "role": "user"
    },
    ])
  }
}
