import { test } from "@japa/runner";

test("register fonctionnel", async ({ client }) => {
  const response = await client.post("/api/auth/login").json({
    firstname: "adrien",
    lastname: "morin",
    email: "admin@gmail.com",
    password: "admin1234",
    test: "test",
    role: "admin",
  });
  response.assertStatus(200);
});
