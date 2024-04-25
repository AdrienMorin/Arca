import { test } from "@japa/runner";
import User from "App/Models/User";

test("get superUser as superUser", async ({ client }) => {
  const user = await User.find(1);
  const response = await client.get(`/api/getUser/${1}`).loginAs(user);

  response.assertStatus(403);
});

test("get admin as superUser", async ({ client }) => {
  const user = await User.find(1);
  const response = await client.get(`/api/getUser/${2}`).loginAs(user);

  response.assertStatus(403);
});

test("get user as superUser", async ({ client }) => {
  const user = await User.find(1);
  const response = await client.get(`/api/getUser/${3}`).loginAs(user);

  response.assertStatus(403);
});

test("get superUser as admin", async ({ client }) => {
  const user = await User.find(2);
  const response = await client.get(`/api/getUser/${1}`).loginAs(user);

  response.assertStatus(200);
});

test("get admin as admin", async ({ client }) => {
  const user = await User.find(2);
  const response = await client.get(`/api/getUser/${2}`).loginAs(user);

  response.assertStatus(200);
});

test("get user as admin", async ({ client }) => {
  const user = await User.find(2);
  const response = await client.get(`/api/getUser/${3}`).loginAs(user);

  response.assertStatus(200);
});

test("get superUser as user", async ({ client }) => {
  const user = await User.find(3);
  const response = await client.get(`/api/getUser/${1}`).loginAs(user);

  response.assertStatus(403);
});

test("get admin as user", async ({ client }) => {
  const user = await User.find(3);
  const response = await client.get(`/api/getUser/${2}`).loginAs(user);

  response.assertStatus(403);
});

test("get user as user", async ({ client }) => {
  const user = await User.find(3);
  const response = await client.get(`/api/getUser/${3}`).loginAs(user);

  response.assertStatus(403);
});

test("get superUser as nothing", async ({ client }) => {
  const response = await client.get(`/api/getUser/${3}`);

  response.assertStatus(401);
});

test("get admin as nothing", async ({ client }) => {
  const response = await client.get(`/api/getUser/${3}`);

  response.assertStatus(401);
});
test("get user as nothing", async ({ client }) => {
  const response = await client.get(`/api/getUser/${3}`);

  response.assertStatus(401);
});
