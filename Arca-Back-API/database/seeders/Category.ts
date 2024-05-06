import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from "App/Models/Category";

export default class extends BaseSeeder {
  public async run () {

    await Category.createMany([
      {
        "name":"PV gendarmerie"
      },
      {
        "name":"Témoignages"
      },
      {
        "name":"Attestations"
      },
      {
        "name":"Poèmes"
      },
      {
        "name":"État civil"
      },
      {
        "name":"Chants"
      },
      {
        "name":"Textes"
      },
      {
        "name":"Comptes-rendus Procès"
      }
    ])
  }
}
