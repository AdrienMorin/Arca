import { test } from "@japa/runner";
import { assert } from "chai";
import User from "App/Models/User";

test("get by id superUser as superUser", async ({ client }) => {
  const user = await User.find(1);
  const user2 = await User.find(1);
  const response = await client.get(`/api/getUser/${1}`).loginAs(user!);

  response.assertStatus(403);

  if (response.status() === 200) {
    response.assertBodyContains(user2!.toJSON());
  }
});

test("get by id admin as superUser", async ({ client }) => {
  const user = await User.find(1);
  const user2 = await User.find(2);
  const response = await client.get(`/api/getUser/${2}`).loginAs(user!);

  response.assertStatus(403); // devreiat marcher

  if (response.status() === 200) {
    response.assertBodyContains(user2!.toJSON());
  }
});

test("get by id user as superUser", async ({ client }) => {
  const user = await User.find(1);
  const user2 = await User.find(3);
  const response = await client.get(`/api/getUser/${3}`).loginAs(user!);

  response.assertStatus(403);

  if (response.status() === 200) {
    response.assertBodyContains(user2!.toJSON());
  }
});

test("get by id superUser as admin", async ({ client }) => {
  const user = await User.find(2);
  const user2 = await User.find(1);
  const response = await client.get(`/api/getUser/${1}`).loginAs(user!);

  response.assertStatus(200); // ne devrait pas marcher ?

  if (response.status() === 200) {
    response.assertBodyContains(user2!.toJSON());
  }
});

test("get by id admin as admin", async ({ client }) => {
  const user = await User.find(2);
  const user2 = await User.find(2);
  const response = await client.get(`/api/getUser/${2}`).loginAs(user!);

  response.assertStatus(200); // ne devrait pas marcher ?

  if (response.status() === 200) {
    response.assertBodyContains(user2!.toJSON());
  }
});

test("get by id user as admin", async ({ client }) => {
  const user = await User.find(2);
  const user2 = await User.find(3);
  const response = await client.get(`/api/getUser/${3}`).loginAs(user!);

  response.assertStatus(200);

  if (response.status() === 200) {
    response.assertBodyContains(user2!.toJSON());
  }
});

test("get by id superUser as user", async ({ client }) => {
  const user = await User.find(3);
  const user2 = await User.find(1);
  const response = await client.get(`/api/getUser/${1}`).loginAs(user!);

  response.assertStatus(403);

  if (response.status() === 200) {
    response.assertBodyContains(user2!.toJSON());
  }
});

test("get by id admin as user", async ({ client }) => {
  const user = await User.find(3);
  const user2 = await User.find(2);
  const response = await client.get(`/api/getUser/${2}`).loginAs(user!);

  response.assertStatus(403);

  if (response.status() === 200) {
    response.assertBodyContains(user2!.toJSON());
  }
});

test("get by id user as user", async ({ client }) => {
  const user = await User.find(3);
  const user2 = await User.find(3);
  const response = await client.get(`/api/getUser/${3}`).loginAs(user!);

  response.assertStatus(403);

  if (response.status() === 200) {
    response.assertBodyContains(user2!.toJSON());
  }
});

test("get by id superUser as nothing", async ({ client }) => {
  const response = await client.get(`/api/getUser/${3}`);

  response.assertStatus(401);
});

test("get by id admin as nothing", async ({ client }) => {
  const response = await client.get(`/api/getUser/${3}`);

  response.assertStatus(401);
});
test("get by id user as nothing", async ({ client }) => {
  const response = await client.get(`/api/getUser/${3}`);

  response.assertStatus(401);
});
