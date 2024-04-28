import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

export default class extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run();
  }

  public async run() {
    if (process.env.NODE_ENV === "test") {
      await this.runSeeder(await import("../testsSeeds"));
    } else {
      await this.runSeeder(await import("../User"));
      await this.runSeeder(await import("../Category"));
      await this.runSeeder(await import("../Location"));
      await this.runSeeder(await import("../Person"));
    }
  }
}
