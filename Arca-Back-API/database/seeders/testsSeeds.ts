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
      firstname: "Rafael",
      lastname: "Folgoas",
      email: "raffolgo@gmail.com",
      password: "raffolgo",
      role: "admin",
    });

    await User.create({
      firstname: "Ad",
      lastname: "Laurent",
      email: "adLaurent@gmail.com",
      password: "adLaurent",
      role: "user",
    });

    await User.create({
      firstname: "Super2",
      lastname: "User2",
      email: "superuser2@gmail.com",
      password: "superuser2",
      role: "superuser",
    });

    await User.create({
      firstname: "rafael2",
      lastname: "folgoas2",
      email: "raffolgo2@gmail.com",
      password: "raffolgo2",
      role: "admin",
    });

    await User.create({
      firstname: "ad2",
      lastname: "laurent2",
      email: "adLaurent2@gmail.com",
      password: "adLaurent2",
      role: "user",
    });

    await User.create({
      firstname: "ad3",
      lastname: "laurent3",
      email: "adLaurent3@gmail.com",
      password: "adLaurent3",
      role: "user",
    });
  }
}
