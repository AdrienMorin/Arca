import { assert } from "chai";
import { test } from "@japa/runner";
import User from "App/Models/User";

test("delete superUser as superUser", async ({ client }) => {
  const user = await User.find(1);
  const user2 = await User.find(4);
  const response = await client
    .post(`/api/deleteUser`)
    .json({
      id: "4",
    })
    .loginAs(user!);

  response.assertStatus(403);

  const userverif = await User.find(user2?.id);
  if (response.status() == 200) {
    assert.isNull(userverif);
    await User.create({
      firstname: user2?.firstname,
      lastname: user2?.lastname,
      email: user2?.email,
      password: user2?.password,
      role: user2?.role,
    });
  } else {
    assert.isNotNull(userverif);
  }
});

test("delete admin as superUser", async ({ client }) => {
  const user = await User.find(1);
  const user2 = await User.find(5);
  const response = await client
    .post(`/api/deleteUser`)
    .json({
      id: "5",
    })
    .loginAs(user!);

  response.assertStatus(403); //devrait être 200

  const userverif = await User.find(user2?.id);
  if (response.status() == 200) {
    assert.isNull(userverif);
    await User.create({
      firstname: user2?.firstname,
      lastname: user2?.lastname,
      email: user2?.email,
      password: user2?.password,
      role: user2?.role,
    });
  } else {
    assert.isNotNull(userverif);
  }
});

test("delete user as superUser", async ({ client }) => {
  const user = await User.find(1);
  const user2 = await User.find(6);
  const response = await client
    .post(`/api/deleteUser`)
    .json({
      id: "6",
    })
    .loginAs(user!);

  response.assertStatus(403); //doit etre 200 ??

  const userverif = await User.find(user2?.id);
  if (response.status() == 200) {
    assert.isNull(userverif);
    await User.create({
      firstname: user2?.firstname,
      lastname: user2?.lastname,
      email: user2?.email,
      password: user2?.password,
      role: user2?.role,
    });
  } else {
    assert.isNotNull(userverif);
  }
});

test("delete superUser as admin", async ({ client }) => {
  const user = await User.find(2);
  const user2 = await User.find(4);
  const response = await client
    .post(`/api/deleteUser`)
    .json({
      id: "4",
    })
    .loginAs(user!);

  response.assertStatus(200);

  const userverif = await User.find(user2?.id);
  if (response.status() == 200) {
    assert.isNull(userverif);
    await User.create({
      firstname: user2?.firstname,
      lastname: user2?.lastname,
      email: user2?.email,
      password: user2?.password,
      role: user2?.role,
    });
  } else {
    assert.isNotNull(userverif);
  }
});

test("delete admin as admin", async ({ client }) => {
  const user = await User.find(2);
  const user2 = await User.find(5);
  const response = await client
    .post(`/api/deleteUser`)
    .json({
      id: "5",
    })
    .loginAs(user!);

  response.assertStatus(200); //ne devrait pas marcher ?

  const userverif = await User.find(user2?.id);
  if (response.status() == 200) {
    assert.isNull(userverif);
    await User.create({
      firstname: user2?.firstname,
      lastname: user2?.lastname,
      email: user2?.email,
      password: user2?.password,
      role: user2?.role,
    });
  } else {
    assert.isNotNull(userverif);
  }
});

test("delete user as admin", async ({ client }) => {
  const user = await User.find(2);
  const user2 = await User.find(6);
  const response = await client
    .post(`/api/deleteUser`)
    .json({
      id: "6",
    })
    .loginAs(user!);

  response.assertStatus(200);

  const userverif = await User.find(user2?.id);
  if (response.status() == 200) {
    assert.isNull(userverif);
    await User.create({
      firstname: user2?.firstname,
      lastname: user2?.lastname,
      email: user2?.email,
      password: user2?.password,
      role: user2?.role,
    });
  } else {
    assert.isNotNull(userverif);
  }
});

test("delete superUser as user", async ({ client }) => {
  const user = await User.find(3);
  const user2 = await User.find(1);
  const response = await client
    .post(`/api/deleteUser`)
    .json({
      id: "1",
    })
    .loginAs(user!);

  response.assertStatus(403);

  const userverif = await User.find(user2?.id);
  if (response.status() == 200) {
    assert.isNull(userverif);
    await User.create({
      firstname: user2?.firstname,
      lastname: user2?.lastname,
      email: user2?.email,
      password: user2?.password,
      role: user2?.role,
    });
  } else {
    assert.isNotNull(userverif);
  }
});

test("delete admin as user", async ({ client }) => {
  const user = await User.find(3);
  const user2 = await User.find(2);
  const response = await client
    .post(`/api/deleteUser`)
    .json({
      id: "2",
    })
    .loginAs(user!);

  response.assertStatus(403);

  const userverif = await User.find(user2?.id);
  if (response.status() == 200) {
    assert.isNull(userverif);
    await User.create({
      firstname: user2?.firstname,
      lastname: user2?.lastname,
      email: user2?.email,
      password: user2?.password,
      role: user2?.role,
    });
  } else {
    assert.isNotNull(userverif);
  }
});

test("delete user as user", async ({ client }) => {
  const user = await User.find(3);
  const user2 = await User.find(7);
  const response = await client
    .post(`/api/deleteUser`)
    .json({
      id: "7",
    })
    .loginAs(user!);

  response.assertStatus(403);

  const userverif = await User.find(user2?.id);
  if (response.status() == 200) {
    assert.isNull(userverif);
    await User.create({
      firstname: user2?.firstname,
      lastname: user2?.lastname,
      email: user2?.email,
      password: user2?.password,
      role: user2?.role,
    });
  } else {
    assert.isNotNull(userverif);
  }
});

test("delete superUser as nothing", async ({ client }) => {
  const user2 = await User.find(1);
  const response = await client.post(`/api/deleteUser`).json({
    id: "1",
  });

  response.assertStatus(401);

  const userverif = await User.find(user2?.id);
  if (response.status() == 200) {
    assert.isNull(userverif);
    await User.create({
      firstname: user2?.firstname,
      lastname: user2?.lastname,
      email: user2?.email,
      password: user2?.password,
      role: user2?.role,
    });
  } else {
    assert.isNotNull(userverif);
  }
});

test("delete admin as nothing", async ({ client }) => {
  const user2 = await User.find(2);
  const response = await client.post(`/api/deleteUser`).json({
    id: "2",
  });

  response.assertStatus(401);

  const userverif = await User.find(user2?.id);
  if (response.status() == 200) {
    assert.isNull(userverif);
    await User.create({
      firstname: user2?.firstname,
      lastname: user2?.lastname,
      email: user2?.email,
      password: user2?.password,
      role: user2?.role,
    });
  } else {
    assert.isNotNull(userverif);
  }
});

test("delete user as nothing", async ({ client }) => {
  const user2 = await User.find(3);
  const response = await client.post(`/api/deleteUser`).json({
    id: "3",
  });

  response.assertStatus(401);

  const userverif = await User.find(user2?.id);
  if (response.status() == 200) {
    assert.isNull(userverif);
    await User.create({
      firstname: user2?.firstname,
      lastname: user2?.lastname,
      email: user2?.email,
      password: user2?.password,
      role: user2?.role,
    });
  } else {
    assert.isNotNull(userverif);
  }
});
