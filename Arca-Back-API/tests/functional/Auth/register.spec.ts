import { assert } from "chai";
import { test } from "@japa/runner";
import User from "App/Models/User";

test("register superUser as superUser", async ({ client }) => {
  const user = await User.find(1);
  const response = await client
    .post("/api/auth/register")
    .json({
      firstname: "adrien",
      lastname: "morin",
      email: "superUser1@gmail.com",
      password: "superUser11234",
      test: "test",
      role: "superuser",
    })
    .loginAs(user!);

  response.assertStatus(400);
});

test("register admin as superUser", async ({ client }) => {
  const user = await User.find(1);
  const response = await client
    .post("/api/auth/register")
    .json({
      firstname: "adrien",
      lastname: "morin",
      email: "admin50@gmail.com",
      password: "admin1234",
      role: "admin",
    })
    .loginAs(user!);

  response.assertStatus(200);

  const user2 = await User.findBy("email", "admin50@gmail.com");
  //check que le user a bien été
  assert.equal(user2?.email, "admin50@gmail.com");
  if (user2) {
    await user2.delete();
  }
});

test("register user as superUser", async ({ client }) => {
  const user = await User.find(1);
  const response = await client
    .post("/api/auth/register")
    .json({
      firstname: "adrien",
      lastname: "morin",
      email: "user50@gmail.com",
      password: "user1234",
      test: "test",
      role: "user",
    })
    .loginAs(user!);

  response.assertStatus(200);

  const user2 = await User.findBy("email", "user50@gmail.com");
  //check que le user a bien été
  assert.equal(user2?.email, "user50@gmail.com");
  if (user2) {
    await user2.delete();
  }
});

test("register superUser as admin", async ({ client }) => {
  const user = await User.find(2);
  const response = await client
    .post("/api/auth/register")
    .json({
      firstname: "adrien",
      lastname: "morin",
      email: "superUser2@gmail.com",
      password: "superUser221234",
      test: "test",
      role: "superuser",
    })
    .loginAs(user!);

  response.assertStatus(400);
});

test("register admin as admin", async ({ client }) => {
  const user = await User.find(2);
  const response = await client
    .post("/api/auth/register")
    .json({
      firstname: "adrien",
      lastname: "morin",
      email: "admin2@gmail.com",
      password: "admin21234",
      test: "test",
      role: "admin",
    })
    .loginAs(user!);

  response.assertStatus(403);
});

test("register user as admin", async ({ client }) => {
  const user = await User.find(2);
  const response = await client
    .post("/api/auth/register")
    .json({
      firstname: "adrien",
      lastname: "morin",
      email: "user50@gmail.com",
      password: "user21234",
      test: "test",
      role: "user",
    })
    .loginAs(user!);

  response.assertStatus(200);

  const user2 = await User.findBy("email", "user50@gmail.com");
  //check que le user a bien été
  assert.equal(user2?.email, "user50@gmail.com");
  if (user2) {
    await user2.delete();
  }
});

test("register superUser as user", async ({ client }) => {
  const user = await User.find(3);
  const response = await client
    .post("/api/auth/register")
    .json({
      firstname: "adrien",
      lastname: "morin",
      email: "superUser3@gmail.com",
      password: "superUser321234",
      test: "test",
      role: "superuser",
    })
    .loginAs(user!);

  response.assertStatus(403);
});

test("register admin as user", async ({ client }) => {
  const user = await User.find(3);
  const response = await client
    .post("/api/auth/register")
    .json({
      firstname: "adrien",
      lastname: "morin",
      email: "admin2@gmail.com",
      password: "admin21234",
      test: "test",
      role: "admin",
    })
    .loginAs(user!);

  response.assertStatus(403);
});

test("register user as user", async ({ client }) => {
  const user = await User.find(3);
  const response = await client
    .post("/api/auth/register")
    .json({
      firstname: "adrien",
      lastname: "morin",
      email: "user2@gmail.com",
      password: "user21234",
      test: "test",
      role: "user",
    })
    .loginAs(user!);

  response.assertStatus(403);
});

test("register superUser as nothing", async ({ client }) => {
  const response = await client.post("/api/auth/register").json({
    firstname: "adrien",
    lastname: "morin",
    email: "user2@gmail.com",
    password: "user21234",
    test: "test",
    role: "superuser",
  });

  response.assertStatus(401);
});

test("register admin as nothing", async ({ client }) => {
  const response = await client.post("/api/auth/register").json({
    firstname: "adrien",
    lastname: "morin",
    email: "user2@gmail.com",
    password: "user21234",
    test: "test",
    role: "admin",
  });

  response.assertStatus(401);
});

test("register user as nothing", async ({ client }) => {
  const response = await client.post("/api/auth/register").json({
    firstname: "adrien",
    lastname: "morin",
    email: "user2@gmail.com",
    password: "user21234",
    test: "test",
    role: "user",
  });

  response.assertStatus(401);
});
