import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from "App/Models/User";

export default class extends BaseSeeder {
  public async run () {
    await User.create(
    {
      "firstname": "Super",
      "lastname": "User",
      "email": "superuser@gmail.com",
      "password": "superuser",
      "role": "superuser"
    }
    )
  }
}
