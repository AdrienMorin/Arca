import { test } from "@japa/runner";
import User from "App/Models/User";

test("delete superUser as superUser", async ({ client }) => {
  const user = await User.find(1);
  const response = await client
    .post(`/api/deleteUser`)
    .json({
      id: "4",
    })
    .loginAs(user);

  if (response.status == 200) {
    await User.create({
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      password: user?.password,
      role: user?.role,
    });
  }
  response.assertStatus(403);
});

test("delete admin as superUser", async ({ client }) => {
  const user = await User.find(1);
  const response = await client
    .post(`/api/deleteUser`)
    .json({
      id: "5",
    })
    .loginAs(user);
  if (response.status == 200) {
    await User.create({
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      password: user?.password,
      role: user?.role,
    });
  }
  response.assertStatus(403);
});

test("delete user as superUser", async ({ client }) => {
  const user = await User.find(1);
  const response = await client
    .post(`/api/deleteUser`)
    .json({
      id: "6",
    })
    .loginAs(user);
  if (response.status == 200) {
    await User.create({
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      password: user?.password,
      role: user?.role,
    });
  }
  response.assertStatus(403);
});

test("delete superUser as admin", async ({ client }) => {
  const user = await User.find(2);
  const response = await client
    .post(`/api/deleteUser`)
    .json({
      id: "4",
    })
    .loginAs(user);
  if (response.status == 200) {
    await User.create({
      id: user?.id,
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      password: user?.password,
      role: user?.role,
    });
  }
  response.assertStatus(200);
});

test("delete admin as admin", async ({ client }) => {
  const user = await User.find(2);
  const response = await client
    .post(`/api/deleteUser`)
    .json({
      id: "5",
    })
    .loginAs(user);
  if (response.status == 200) {
    await User.create({
      id: user?.id,
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      password: user?.password,
      role: user?.role,
    });
  }
  response.assertStatus(200);
});

test("delete user as admin", async ({ client }) => {
  const user = await User.find(2);
  const response = await client
    .post(`/api/deleteUser`)
    .json({
      id: "6",
    })
    .loginAs(user);
  if (response.status == 200) {
    await User.create({
      id: user?.id,
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      password: user?.password,
      role: user?.role,
    });
  }
  response.assertStatus(200);
});

test("delete superUser as user", async ({ client }) => {
  const user = await User.find(3);
  const response = await client
    .post(`/api/deleteUser`)
    .json({
      id: "1",
    })
    .loginAs(user);
  if (response.status == 200) {
    await User.create({
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      password: user?.password,
      role: user?.role,
    });
  }
  response.assertStatus(403);
});

test("delete admin as user", async ({ client }) => {
  const user = await User.find(3);
  const response = await client
    .post(`/api/deleteUser`)
    .json({
      id: "2",
    })
    .loginAs(user);
  if (response.status == 200) {
    await User.create({
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      password: user?.password,
      role: user?.role,
    });
  }
  response.assertStatus(403);
});

test("delete user as user", async ({ client }) => {
  const user = await User.find(3);
  const response = await client
    .post(`/api/deleteUser`)
    .json({
      id: "3",
    })
    .loginAs(user);
  if (response.status == 200) {
    await User.create({
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      password: user?.password,
      role: user?.role,
    });
  }
  response.assertStatus(403);
});

test("delete superUser as nothing", async ({ client }) => {
  const response = await client.post(`/api/deleteUser`).json({
    id: "3",
  });

  response.assertStatus(401);
});

test("delete admin as nothing", async ({ client }) => {
  const response = await client.post(`/api/deleteUser`).json({
    id: "3",
  });

  response.assertStatus(401);
});

test("delete user as nothing", async ({ client }) => {
  const response = await client.post(`/api/deleteUser`).json({
    id: "3",
  });

  response.assertStatus(401);
});
