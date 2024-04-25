import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";

export default class extends BaseSeeder {
  public async run() {
    await User.create({
      firstname: "Super",
      lastname: "User",
      email: "superuser@gmail.com",
      password: "superuser",
      role: "superuser",
    });

    await User.create({
      firstname: "rafael",
      lastname: "folgoas",
      email: "raffolgo@gmail.com",
      password: "raffolgo",
      role: "admin",
    });

    await User.create({
      firstname: "ad",
      lastname: "laurent",
      email: "adLaurent@gmail.com",
      password: "adLaurent",
      role: "user",
    });
  }
}
