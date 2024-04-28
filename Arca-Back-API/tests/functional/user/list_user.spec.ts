import { test } from "@japa/runner";
import User from "App/Models/User";

test("get list users as superUser", async ({ client }) => {
  const user = await User.find(1);
  const response = await client.get("/api/fetchUsers").loginAs(user!);

  response.assertStatus(403);
});

test("get list users as admin", async ({ client }) => {
  const user = await User.find(2);
  const response = await client.get("/api/fetchUsers").loginAs(user!);

  response.assertStatus(200);
});

test("get list users as user", async ({ client }) => {
  const user = await User.find(3);
  const response = await client.get("/api/fetchUsers").loginAs(user!);

  response.assertStatus(403);
});

test("get list user as nothing", async ({ client }) => {
  const response = await client.get("/api/fetchUsers");

  response.assertStatus(401);
});
