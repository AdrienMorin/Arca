import { test } from "@japa/runner";
import User from "App/Models/User";

test("get by id superUser as superUser", async ({ client }) => {
  const user = await User.find(1);
  const user2 = await User.find(4);
  const response = await client.get(`/api/user/getUser/${4}`).loginAs(user!);

  response.assertStatus(200);

  if (response.status() === 200) {
    response.assertBodyContains({
      email:user2!.email,
      firstname:user2!.firstname,
      id:user2!.id,
      lastname:user2!.lastname
    });
  }
});

test("get by id admin as superUser", async ({ client }) => {
  const user = await User.find(1);
  const user2 = await User.find(5);
  const response = await client.get(`/api/user/getUser/${5}`).loginAs(user!);

  response.assertStatus(200);

  if (response.status() === 200) {
    response.assertBodyContains({
      email:user2!.email,
      firstname:user2!.firstname,
      id:user2!.id,
      lastname:user2!.lastname
    });
  }
});

test("get by id user as superUser", async ({ client }) => {
  const user = await User.find(1);
  const user2 = await User.find(6);
  const response = await client.get(`/api/user/getUser/${6}`).loginAs(user!);

  response.assertStatus(200);

  if (response.status() === 200) {
    response.assertBodyContains({
      email:user2!.email,
      firstname:user2!.firstname,
      id:user2!.id,
      lastname:user2!.lastname
    });
  }
});

test("get by id superUser as admin", async ({ client }) => {
  const user = await User.find(2);
  const user2 = await User.find(4);
  const response = await client.get(`/api/user/getUser/${4}`).loginAs(user!);

  response.assertStatus(200);

  if (response.status() === 200) {
    response.assertBodyContains({
      email:user2!.email,
      firstname:user2!.firstname,
      id:user2!.id,
      lastname:user2!.lastname
    });
  }
});

test("get by id admin as admin", async ({ client }) => {
  const user = await User.find(2);
  const user2 = await User.find(5);
  const response = await client.get(`/api/user/getUser/${5}`).loginAs(user!);

  response.assertStatus(200);

  if (response.status() === 200) {
    response.assertBodyContains({
      email:user2!.email,
      firstname:user2!.firstname,
      id:user2!.id,
      lastname:user2!.lastname
    });
  }
});

test("get by id user as admin", async ({ client }) => {
  const user = await User.find(2);
  const user2 = await User.find(6);
  const response = await client.get(`/api/user/getUser/${6}`).loginAs(user!);

  response.assertStatus(200);

  if (response.status() === 200) {
    response.assertBodyContains({
      email:user2!.email,
      firstname:user2!.firstname,
      id:user2!.id,
      lastname:user2!.lastname
    });
  }
});

test("get by id superUser as user", async ({ client }) => {
  const user = await User.find(3);
  const response = await client.get(`/api/user/getUser/${4}`).loginAs(user!);

  response.assertStatus(403);

});

test("get by id admin as user", async ({ client }) => {
  const user = await User.find(3);
  const response = await client.get(`/api/user/getUser/${5}`).loginAs(user!);

  response.assertStatus(403);
});
test("get by id user as user", async ({ client }) => {
  const user = await User.find(3);
  const response = await client.get(`/api/user/getUser/${6}`).loginAs(user!);

  response.assertStatus(403);
});

test("get by id superUser as nothing", async ({ client }) => {
  const response = await client.get(`/api/user/getUser/${3}`);

  response.assertStatus(401);
});

test("get by id admin as nothing", async ({ client }) => {
  const response = await client.get(`/api/user/getUser/${3}`);

  response.assertStatus(401);
});
test("get by id user as nothing", async ({ client }) => {
  const response = await client.get(`/api/user/getUser/${3}`);

  response.assertStatus(401);
});
