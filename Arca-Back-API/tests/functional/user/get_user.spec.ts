import { test } from "@japa/runner";
import User from "App/Models/User";

test("get user as superUser", async ({ client }) => {
  const user = await User.find(1);
  const response = await client.get("/api/getUser").loginAs(user);

  response.assertStatus(200);
});

test("get user as admin", async ({ client }) => {
  const user = await User.find(1);
  const response = await client.get("/api/getUser").loginAs(user);

  response.assertStatus(200);
});

test("get user as user", async ({ client }) => {
  const user = await User.find(1);
  const response = await client.get("/api/getUser").loginAs(user);

  response.assertStatus(200);
});
