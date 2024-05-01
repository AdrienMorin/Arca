import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChangePasswordByEmailValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [
      rules.required(),
      rules.email(),
    ]),
    newPassword: schema.string({}, [
      rules.required(),
      rules.minLength(8),
      rules.maxLength(30)
    ]),
  })

  public messages: CustomMessages = {}
}
