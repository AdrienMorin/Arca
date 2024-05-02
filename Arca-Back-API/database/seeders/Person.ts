import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Person from "App/Models/Person";

export default class extends BaseSeeder {
  public async run () {
    await Person.create({
      "firstname": "john",
      "lastname": "doe",
      "displayname": "John Doe",
      "category": "user",
    })
  }
}
