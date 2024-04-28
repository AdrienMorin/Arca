import { test } from "@japa/runner";

test("login wrong mail", async ({ client }) => {
  const response = await client.post("/api/auth/login").json({
    email: "userdoesntexists@nomail.com",
    password: "password",
  });
  response.assertStatus(400);
});

test("login wrong password SuperAdmin", async ({ client }) => {
  const response = await client.post("/api/auth/login").json({
    email: "superuser@gmail.com",
    password: "wrongpassword",
  });
  response.assertStatus(400);
});

test("login wrong password admin", async ({ client }) => {
  const response = await client.post("/api/auth/login").json({
    email: "raffolgo@gmail.com",
    password: "wrongpassword",
  });
  response.assertStatus(400);
});

test("login wrong password user", async ({ client }) => {
  const response = await client.post("/api/auth/login").json({
    email: "adLaurent@gmail.com",
    password: "wrongpassword",
  });
  response.assertStatus(400);
});

test("login good credentials SuperAdmin ", async ({ client }) => {
  const response = await client.post("/api/auth/login").json({
    email: "superuser@gmail.com",
    password: "superuser",
  });
  response.assertStatus(200);
});

test("login good credentials admin ", async ({ client }) => {
  const response = await client.post("/api/auth/login").json({
    email: "raffolgo@gmail.com",
    password: "raffolgo",
  });
  response.assertStatus(200);
});

test("login good credentials user ", async ({ client }) => {
  const response = await client.post("/api/auth/login").json({
    email: "adLaurent@gmail.com",
    password: "adLaurent",
  });
  response.assertStatus(200);
});
