import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateLocationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name : schema.string({}, [
      rules.required(),
      rules.trim(),
      rules.escape(),
      rules.minLength(3),
      rules.maxLength(255)
    ])
  })

  public messages: CustomMessages = {}
}
