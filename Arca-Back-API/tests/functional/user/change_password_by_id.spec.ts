import { test } from "@japa/runner";
import User from "App/Models/User";

test("changePassword by ID SuperUser as SuperUser ", async ({ client }) => {
  const mainUser = await User.find(1);
  const user = await User.create({
    firstname: "pass",
    lastname: "word",
    email: "password@gmail.com",
    password: "password1",
    role: "superuser",
  });

  const response = await client
    .post("/api/changePasswordById")
    .json({
      id: user!.id,
      oldPassword: "password1",
      newPassword: "password2",
    })
    .loginAs(mainUser!);

  response.assertStatus(200); // devrait ne pas marcher

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
    response2.assertStatus(401);
  }
  await user.delete();
});

test("changePassword by ID admin as SuperUser ", async ({ client }) => {
  const mainUser = await User.find(1);
  const user = await User.create({
    firstname: "pass",
    lastname: "word",
    email: "password@gmail.com",
    password: "password1",
    role: "admin",
  });

  const response = await client
    .post("/api/changePasswordById")
    .json({
      id: user!.id,
      oldPassword: "password1",
      newPassword: "password2",
    })
    .loginAs(mainUser!);

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
    response2.assertStatus(401);
  }
  await user.delete();
});

test("changePassword by ID user as SuperUser ", async ({ client }) => {
  const mainUser = await User.find(1);
  const user = await User.create({
    firstname: "pass",
    lastname: "word",
    email: "password@gmail.com",
    password: "password1",
    role: "user",
  });

  const response = await client
    .post("/api/changePasswordById")
    .json({
      id: user!.id,
      oldPassword: "password1",
      newPassword: "password2",
    })
    .loginAs(mainUser!);

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
    response2.assertStatus(401);
  }
  await user.delete();
});

test("changePassword by ID SuperUser as admin ", async ({ client }) => {
  const mainUser = await User.find(2);
  const user = await User.create({
    firstname: "pass",
    lastname: "word",
    email: "password@gmail.com",
    password: "password1",
    role: "superuser",
  });

  const response = await client
    .post("/api/changePasswordById")
    .json({
      id: user!.id,
      oldPassword: "password1",
      newPassword: "password2",
    })
    .loginAs(mainUser!);

  response.assertStatus(403);
  await user.delete();
});

test("changePassword by ID admin as admin ", async ({ client }) => {
  const mainUser = await User.find(2);
  const user = await User.create({
    firstname: "pass",
    lastname: "word",
    email: "password@gmail.com",
    password: "password1",
    role: "admin",
  });

  const response = await client
    .post("/api/changePasswordById")
    .json({
      id: user!.id,
      oldPassword: "password1",
      newPassword: "password2",
    })
    .loginAs(mainUser!);

  response.assertStatus(403);

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
    response2.assertStatus(401);
  }
  await user.delete();
});

test("changePassword by ID user as admin ", async ({ client }) => {
  const mainUser = await User.find(2);
  const user = await User.create({
    firstname: "pass",
    lastname: "word",
    email: "password@gmail.com",
    password: "password1",
    role: "user",
  });

  const response = await client
    .post("/api/changePasswordById")
    .json({
      id: user!.id,
      oldPassword: "password1",
      newPassword: "password2",
    })
    .loginAs(mainUser!);

  response.assertStatus(403); //devrait marcher

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
    response2.assertStatus(401);
  }
  await user.delete();
});

test("changePassword by ID SuperUser as user ", async ({ client }) => {
  const mainUser = await User.find(3);
  const user = await User.create({
    firstname: "pass",
    lastname: "word",
    email: "password@gmail.com",
    password: "password1",
    role: "superuser",
  });

  const response = await client
    .post("/api/changePasswordById")
    .json({
      id: user!.id,
      oldPassword: "password1",
      newPassword: "password2",
    })
    .loginAs(mainUser!);

  response.assertStatus(403);
  await user.delete();
});

test("changePassword by ID admin as user ", async ({ client }) => {
  const mainUser = await User.find(3);
  const user = await User.create({
    firstname: "pass",
    lastname: "word",
    email: "password@gmail.com",
    password: "password1",
    role: "admin",
  });

  const response = await client
    .post("/api/changePasswordById")
    .json({
      id: user!.id,
      oldPassword: "password1",
      newPassword: "password2",
    })
    .loginAs(mainUser!);

  response.assertStatus(403);

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
    response2.assertStatus(401);
  }
  await user.delete();
});

test("changePassword by ID user as user ", async ({ client }) => {
  const mainUser = await User.find(3);
  const user = await User.create({
    firstname: "pass",
    lastname: "word",
    email: "password@gmail.com",
    password: "password1",
    role: "user",
  });

  const response = await client
    .post("/api/changePasswordById")
    .json({
      id: user!.id,
      oldPassword: "password1",
      newPassword: "password2",
    })
    .loginAs(mainUser!);

  response.assertStatus(403);

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
    response2.assertStatus(401);
  }
  await user.delete();
});

test("changePassword by ID SuperUser as nothing ", async ({ client }) => {
  const user = await User.create({
    firstname: "pass",
    lastname: "word",
    email: "password@gmail.com",
    password: "password1",
    role: "superuser",
  });

  const response = await client.post("/api/changePasswordById").json({
    id: user!.id,
    oldPassword: "password1",
    newPassword: "password2",
  });

  response.assertStatus(401);
  await user.delete();
});

test("changePassword by ID admin as nothing ", async ({ client }) => {
  const user = await User.create({
    firstname: "pass",
    lastname: "word",
    email: "password@gmail.com",
    password: "password1",
    role: "admin",
  });

  const response = await client.post("/api/changePasswordById").json({
    id: user!.id,
    oldPassword: "password1",
    newPassword: "password2",
  });

  response.assertStatus(401);
  await user.delete();
});

test("changePassword by ID user as nothing ", async ({ client }) => {
  const user = await User.create({
    firstname: "pass",
    lastname: "word",
    email: "password@gmail.com",
    password: "password1",
    role: "user",
  });

  const response = await client.post("/api/changePasswordById").json({
    id: user!.id,
    oldPassword: "password1",
    newPassword: "password2",
  });

  response.assertStatus(401);
  await user.delete();
});
