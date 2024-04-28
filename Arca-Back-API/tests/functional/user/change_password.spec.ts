import { test } from "@japa/runner";
import User from "App/Models/User";

test("changePassword Super user ", async ({ client }) => {
  const user = await User.create({
    firstname: "pass",
    lastname: "word",
    email: "password@gmail.com",
    password: "password1",
    role: "superuser",
  });

  const response = await client
    .post("/api/changePassword")
    .json({
      oldPassword: "password1",
      newPassword: "password2",
    })
    .loginAs(user!);

  response.assertStatus(200);

  if (response.status() === 200) {
    const response = await client.post("/api/auth/login").json({
      email: user!.email,
      password: "password2",
    });
    response.assertStatus(200);

    const response2 = await client.post("/api/auth/login").json({
      email: user!.email,
      password: "password1",
    });
    response2.assertStatus(400);

    await user.delete();
  }
});

test("changePassword admin ", async ({ client }) => {
  const user = await User.create({
    firstname: "pass",
    lastname: "word",
    email: "password@gmail.com",
    password: "password1",
    role: "admin",
  });

  const response = await client
    .post("/api/changePassword")
    .json({
      oldPassword: "password1",
      newPassword: "password2",
    })
    .loginAs(user!);

  response.assertStatus(200);

  if (response.status() === 200) {
    const response = await client.post("/api/auth/login").json({
      email: user!.email,
      password: "password2",
    });
    response.assertStatus(200);

    const response2 = await client.post("/api/auth/login").json({
      email: user!.email,
      password: "password1",
    });
    response2.assertStatus(400);

    await user.delete();
  }
});

test("changePassword user ", async ({ client }) => {
  const user = await User.create({
    firstname: "pass",
    lastname: "word",
    email: "password@gmail.com",
    password: "password1",
    role: "user",
  });

  const response = await client
    .post("/api/changePassword")
    .json({
      oldPassword: "password1",
      newPassword: "password2",
    })
    .loginAs(user!);

  response.assertStatus(200);

  if (response.status() === 200) {
    const response = await client.post("/api/auth/login").json({
      email: user!.email,
      password: "password2",
    });
    response.assertStatus(200);

    const response2 = await client.post("/api/auth/login").json({
      email: user!.email,
      password: "password1",
    });
    response2.assertStatus(400);

    await user.delete();
  }
});

test("changePassword samePassword user ", async ({ client }) => {
  const user = await User.create({
    firstname: "pass",
    lastname: "word",
    email: "password@gmail.com",
    password: "password1",
    role: "superuser",
  });

  const response = await client
    .post("/api/changePassword")
    .json({
      oldPassword: "password1",
      newPassword: "password1",
    })
    .loginAs(user!);

  response.assertStatus(200); //devrait pas marcher ?

  if (response.status() === 200) {
    const response2 = await client.post("/api/auth/login").json({
      email: user!.email,
      password: "password1",
    });
    response2.assertStatus(200);
    if (response2.status() === 200) {
      await user.delete();
    }
  }
});
