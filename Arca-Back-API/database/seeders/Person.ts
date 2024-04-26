import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Person from "App/Models/Person";

export default class extends BaseSeeder {
  public async run () {
    await Person.create({
      "name": "john doe"
    })
  }
}
