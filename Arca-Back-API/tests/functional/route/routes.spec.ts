import { test } from "@japa/runner";

test("route don't exist", async ({ client }) => {
  const response = await client.get("/api/dontExist");

  response.assertStatus(404);
});

test("route exist", async ({ client }) => {
  const response = await client.get("/api/");

  response.assertStatus(200);
});
