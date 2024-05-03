import { test } from "@japa/runner";
import User from "App/Models/User";

test("changePassword by ID SuperUser as SuperUser ", async ({ client }) => {
  const mainUser = await User.find(1);
  const secondUser = await User.find(4);
  const oldPassword = "superuser2";
  const newPassword = "password2";

  const response = await client
    .post("/api/user/changePasswordById")
    .json({
      id: secondUser!.id,
      oldPassword: oldPassword,
      newPassword: newPassword,
    })
    .loginAs(mainUser!);

  response.assertStatus(200);

  if (response.status() === 200) {
    const response = await client.post("/api/auth/login").json({
      email: secondUser!.email,
      password: newPassword,
    });
    response.assertStatus(200);

    const response2 = await client.post("/api/auth/login").json({
      email: secondUser!.email,
      password: oldPassword,
    });
    response2.assertStatus(422);
  }

});

test("changePassword by ID admin as SuperUser ", async ({ client }) => {
  const mainUser = await User.find(1);
  const secondUser = await User.find(5);
  const oldPassword = "raffolgo2";
  const newPassword = "password2";

  const response = await client
    .post("/api/user/changePasswordById")
    .json({
      id: secondUser!.id,
      oldPassword: oldPassword,
      newPassword: newPassword,
    })
    .loginAs(mainUser!);

  response.assertStatus(200);

  if (response.status() === 200) {
    const response = await client.post("/api/auth/login").json({
      email: secondUser!.email,
      password: newPassword,
    });
    response.assertStatus(200);

    const response2 = await client.post("/api/auth/login").json({
      email: secondUser!.email,
      password: oldPassword,
    });
    response2.assertStatus(422);
  }

});

test("changePassword by ID user as SuperUser ", async ({ client }) => {
  const mainUser = await User.find(1);
  const secondUser = await User.find(6);
  const oldPassword = "adLaurent2";
  const newPassword = "password2";

  const response = await client
    .post("/api/user/changePasswordById")
    .json({
      id: secondUser!.id,
      oldPassword: oldPassword,
      newPassword: newPassword,
    })
    .loginAs(mainUser!);

  response.assertStatus(200);

  if (response.status() === 200) {
    const response = await client.post("/api/auth/login").json({
      email: secondUser!.email,
      password: newPassword,
    });
    response.assertStatus(200);

    const response2 = await client.post("/api/auth/login").json({
      email: secondUser!.email,
      password: oldPassword,
    });
    response2.assertStatus(422);
  }

});

test("changePassword by ID SuperUser as admin ", async ({ client }) => {
  const mainUser = await User.find(2);
  const secondUser = await User.find(1);

  const response = await client
    .post("/api/user/changePasswordById")
    .json({
      id: secondUser!.id,
      oldPassword: "superuser",
      newPassword: "password2",
    })
    .loginAs(mainUser!);

  response.assertStatus(403);
});

test("changePassword by ID admin as admin ", async ({ client }) => {
  const mainUser = await User.find(2);
  const secondUser= await User.find(5);

  const response = await client
    .post("/api/user/changePasswordById")
    .json({
      id: secondUser!.id,
      oldPassword: "raffolgo2",
      newPassword: "password2",
    })
    .loginAs(mainUser!);

  response.assertStatus(403);
});

test("changePassword by ID user as admin ", async ({ client }) => {
  const mainUser = await User.find(2);
  const secondUser = await User.find(6);

  const response = await client
    .post("/api/user/changePasswordById")
    .json({
      id: secondUser!.id,
      oldPassword: "adLaurent2",
      newPassword: "password2",
    })
    .loginAs(mainUser!);

  response.assertStatus(403);
});

test("changePassword by ID SuperUser as user ", async ({ client }) => {
  const mainUser = await User.find(3);
  const secondUser = await User.find(1);

  const response = await client
    .post("/api/user/changePasswordById")
    .json({
      id: secondUser!.id,
      oldPassword: "superuser",
      newPassword: "password2",
    })
    .loginAs(mainUser!);

  response.assertStatus(403);

});

test("changePassword by ID admin as user ", async ({ client }) => {
  const mainUser = await User.find(3);
  const secondUser = await User.find(5);

  const response = await client
    .post("/api/user/changePasswordById")
    .json({
      id: secondUser!.id,
      oldPassword: "raffolgo2",
      newPassword: "password2",
    })
    .loginAs(mainUser!);

  response.assertStatus(403);

});

test("changePassword by ID user as user ", async ({ client }) => {
  const mainUser = await User.find(3);
  const secondUser = await User.find(6);

  const response = await client
    .post("/api/user/changePasswordById")
    .json({
      id: secondUser!.id,
      oldPassword: "adLaurent2",
      newPassword: "password2",
    })
    .loginAs(mainUser!);

  response.assertStatus(403);

});

test("changePassword by ID SuperUser as nothing ", async ({ client }) => {
  const user = await User.find(1);

  const response = await client.post("/api/user/changePasswordById").json({
    id: user!.id,
    oldPassword: "superuser",
    newPassword: "password2",
  });

  response.assertStatus(401);

});

test("changePassword by ID admin as nothing ", async ({ client }) => {
  const user = await User.find(5);

  const response = await client.post("/api/user/changePasswordById").json({
    id: user!.id,
    oldPassword: "raffolgo2",
    newPassword: "password2",
  });

  response.assertStatus(401);

});

test("changePassword by ID user as nothing ", async ({ client }) => {
  const user = await User.find(6);

  const response = await client.post("/api/user/changePasswordById").json({
    id: user!.id,
    oldPassword: "adLaurent2",
    newPassword: "password2",
  });

  response.assertStatus(401);
});
