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
    .loginAs(user);

  response.assertStatus(400);
});

test("register admin as superUser", async ({ client }) => {
  const user = await User.find(1);
  const response = await client
    .post("/api/auth/register")
    .json({
      firstname: "adrien",
      lastname: "morin",
      email: "admin@gmail.com",
      password: "admin1234",
      test: "test",
      role: "admin",
    })
    .loginAs(user);

  response.assertStatus(200);
});

test("register user as superUser", async ({ client }) => {
  const user = await User.find(1);
  const response = await client
    .post("/api/auth/register")
    .json({
      firstname: "adrien",
      lastname: "morin",
      email: "user@gmail.com",
      password: "user1234",
      test: "test",
      role: "user",
    })
    .loginAs(user);

  response.assertStatus(200);
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
    .loginAs(user);

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
    .loginAs(user);

  response.assertStatus(403);
});

test("register user as admin", async ({ client }) => {
  const user = await User.find(2);
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
    .loginAs(user);

  response.assertStatus(200);
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
    .loginAs(user);

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
    .loginAs(user);

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
    .loginAs(user);

  response.assertStatus(403);
});
