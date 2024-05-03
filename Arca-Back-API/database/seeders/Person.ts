import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Person from "App/Models/Person";

export default class extends BaseSeeder {
  public async run () {
    await Person.create({
      "firstname": "victor",
      "lastname": "le saint",
      "displayname": "Victor Le Saint",
      "role": "user",
    })
  }
}
