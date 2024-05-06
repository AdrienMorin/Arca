import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Person from "App/Models/Person";

export default class extends BaseSeeder {
  public async run () {
    await Person.createMany([
      {
        "firstname": "Louis",
        "lastname": "Aulas",
        "displayname": "Louis Aulas",
        "role": "Résistant",
      },
      {
        "firstname": "Roger",
        "lastname": "Bacot",
        "displayname": "Roger Bacot",
        "role": "Résistant",
      },
      {
        "firstname": "André",
        "lastname": "Bajard",
        "displayname": "André Bajard",
        "role": "Résistant",
      },
      {
        "firstname": "Antoine",
        "lastname": "Basseuil",
        "displayname": "Antoine Basseuil",
        "role": "Résistant",
      },
      {
        "firstname": "Roger",
        "lastname": "Bel",
        "displayname": "Roger Bel",
        "role": "Résistant",
      },
      {
        "firstname": "Gabriel",
        "lastname": "Belot",
        "displayname": "Gabriel Belot",
        "role": "Résistant",
      },
      {
        "firstname": "Henri",
        "lastname": "Benas",
        "displayname": "Henri Benas",
        "role": "Résistant",
      },
      {
        "firstname": "André",
        "lastname": "Chavret",
        "displayname": "André Chavret",
        "role": "Résistant",
      },
      {
        "firstname": "Maurice",
        "lastname": "Échalier",
        "displayname": "Maurice Échalier",
        "role": "Résistant",
      }
    ])
  }
}
