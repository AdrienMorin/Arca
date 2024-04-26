import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Location from "App/Models/Location";

export default class extends BaseSeeder {
  public async run () {
    await Location.create({
      "name":"villeurbanne"
    })
  }
}
