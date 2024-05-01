import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChangePasswordByIdValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number([
        rules.required(),
        rules.exists({ table: 'users', column: 'id' })
    ]),
    newPassword: schema.string({}, [
      rules.required(),
      rules.minLength(8),
      rules.maxLength(30)
    ]),
  })

  public messages: CustomMessages = {}
}
