import { test } from "@japa/runner";
import User from "App/Models/User";

test("changePassword Super user ", async ({ client }) => {
  const user = await User.find(1);
  const oldPassword = "superuser";
  const newPassword = "password2";

  const response = await client
    .post("/api/user/changePassword")
    .json({
      oldPassword: oldPassword,
      newPassword: newPassword,
    })
    .loginAs(user!);

  response.assertStatus(200);

  if (response.status() === 200) {
    const response = await client.post("/api/auth/login").json({
      email: user!.email,
      password: newPassword,
    });
    response.assertStatus(200);

    const response2 = await client.post("/api/auth/login").json({
      email: user!.email,
      password: oldPassword,
    });
    response2.assertStatus(401);

  }
});

test("changePassword admin ", async ({ client }) => {
  const user = await User.find(2);
  const oldPassword = "raffolgo";
  const newPassword = "password2";

  const response = await client
    .post("/api/user/changePassword")
    .json({
      oldPassword: oldPassword,
      newPassword: newPassword,
    })
    .loginAs(user!);

  response.assertStatus(200);

  if (response.status() === 200) {
    const response = await client.post("/api/auth/login").json({
      email: user!.email,
      password: newPassword,
    });
    response.assertStatus(200);

    const response2 = await client.post("/api/auth/login").json({
      email: user!.email,
      password: oldPassword,
    });
    response2.assertStatus(401);

  }
});

test("changePassword user ", async ({ client }) => {
  const user = await User.find(3);
  const oldPassword = "adLaurent";
  const newPassword = "password2";

  const response = await client
    .post("/api/user/changePassword")
    .json({
      oldPassword: oldPassword,
      newPassword: newPassword,
    })
    .loginAs(user!);

  response.assertStatus(200);

  if (response.status() === 200) {
    const response = await client.post("/api/auth/login").json({
      email: user!.email,
      password: newPassword,
    });
    response.assertStatus(200);

    const response2 = await client.post("/api/auth/login").json({
      email: user!.email,
      password: oldPassword,
    });
    response2.assertStatus(401);

  }
});


