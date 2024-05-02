// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import ChangePasswordByIdValidator from "App/Validators/User/ChangePasswordByIdValidator";
import ChangePasswordByEmailValidator from "App/Validators/User/ChangePasswordByEmailValidator";

export default class UsersController {

  public async fetchUsers({ auth, bouncer, response }: HttpContextContract) {
    await auth.use("api").authenticate();
    await bouncer.with("UserPolicy").authorize("viewList");
    const allUsers = await User.query();
    return response.status(200).json(allUsers);
  }

  public async getLoggedUser({ auth, response }: HttpContextContract) {
    await auth.use("api").authenticate();
    const user = auth.use("api").user!;
    user.firstname =
      user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1);
    user.lastname =
      user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1);
    return response.status(200).json(auth.use("api").user!);
  }

  public async getUserById({
    auth,
    bouncer,
    request,
    response,
  }: HttpContextContract) {
    await auth.use("api").authenticate();
    await bouncer.with("UserPolicy").authorize("view");
    const user = await User.findOrFail(request.param("id"));
    return response.status(200).json(user);
  }

  public async deleteUserById({
    auth,
    bouncer,
    request,
    response,
  }: HttpContextContract) {
    await auth.use("api").authenticate();
    try {
      const userId = request.body().id;
      const user = await User.findOrFail(userId);
      if (user.role === "superuser") {
        return response
          .status(400)
          .json({ message: "Vous ne pouvez pas supprimer ce compte" });
      } else if (user.role === "admin") {
        await bouncer.with("UserPolicy").authorize("deleteAdmin");
      } else {
        await bouncer.with("UserPolicy").authorize("deleteUser");
      }
      await user.delete();
      return response
        .status(200)
        .json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
      return response
        .status(400)
        .json({
          message:
            "Une erreur est survenue lors de la suppression de l'utilisateur",
        });
    }
  }

  public async changeUserPassword({
    auth,
    request,
    response,
  }: HttpContextContract) {
    await auth.use("api").authenticate();
    try {
      const user = await User.findOrFail(auth.user!.id);

      const { oldPassword, newPassword } = request.body();

      const authentication = await auth
        .use("api")
        .attempt(auth.user!.email, oldPassword);

      if (authentication) {
        user.password = newPassword;
        await user.save();
      }

      return response
        .status(200)
        .json({ message: "Mot de passe mis à jour avec succès" });
    } catch (error) {
      return response
        .status(400)
        .json({
          message:
            "Une erreur est survenue lors de la modification du mot de passe",
        });
    }
  }

  public async changeUserPasswordById({
    auth,
    bouncer,
    request,
    response,
  }: HttpContextContract) {
    await auth.use("api").authenticate();
    await bouncer.with("UserPolicy").authorize("changePasswordById");
    try {
      const { id, newPassword } = await request.validate(
        ChangePasswordByIdValidator
      );
      const user = await User.findOrFail(id);
      user.password = newPassword;
      await user.save();
      return response
        .status(200)
        .json({ message: "Mot de passe mis à jour avec succès" });
    } catch (error) {
      return response
        .status(400)
        .json({
          message:
            "Une erreur est survenue lors de la modification du mot de passe",
        });
    }
  }

  public async changeUserPasswordByEmail({
    auth,
    bouncer,
    request,
    response,
  }: HttpContextContract) {
    await auth.use("api").authenticate();
    await bouncer.with("UserPolicy").authorize("changePasswordByEmail");
    try {
      const { email, newPassword } = await request.validate(
        ChangePasswordByEmailValidator
      );
      const user = await User.findOrFail(email);
      user.password = newPassword;
      await user.save();
      return response
        .status(200)
        .json({ message: "Mot de passe mis à jour avec succès" });
    } catch (error) {
      return response
        .status(400)
        .json({
          message:
            "Une erreur est survenue lors de la modification du mot de passe",
        });
    }
  }
}
