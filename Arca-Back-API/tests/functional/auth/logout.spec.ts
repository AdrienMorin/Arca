import { test } from "@japa/runner";
import User from "App/Models/User";

test("logout superUser ", async ({ client }) => {
  const user = await User.find(1);
  // Déconnectez l'utilisateur
  const logoutResponse = await client.post("/api/auth/logout").loginAs(user);

  logoutResponse.assertStatus(200);
});

test("logout admin ", async ({ client }) => {
  const user = await User.find(2);
  // Déconnectez l'utilisateur
  const logoutResponse = await client.post("/api/auth/logout").loginAs(user);

  logoutResponse.assertStatus(200);
});

test("logout user ", async ({ client }) => {
  const user = await User.find(3);
  // Déconnectez l'utilisateur
  const logoutResponse = await client.post("/api/auth/logout").loginAs(user);

  logoutResponse.assertStatus(200);
});

test("logout non connecté ", async ({ client }) => {
  // Déconnectez l'utilisateur
  const logoutResponse = await client.post("/api/auth/logout");

  logoutResponse.assertStatus(401);
});
