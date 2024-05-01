import { rules,schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePersonValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    displayname : schema.string({}, [
      rules.required(),
      rules.trim(),
      rules.escape(),
      rules.minLength(3),
      rules.maxLength(255)
    ]),
    firstname : schema.string({}, [
      rules.required(),
      rules.trim(),
      rules.escape(),
      rules.minLength(3),
      rules.maxLength(255)
    ]),
    lastname : schema.string({}, [
      rules.required(),
      rules.trim(),
      rules.escape(),
      rules.minLength(3),
      rules.maxLength(255)
    ]),
    category : schema.string({}, [
      rules.trim(),
      rules.escape(),
      rules.minLength(3),
      rules.maxLength(255)
    ]),
    location : schema.number.optional()
  })

  public messages: CustomMessages = {}
}
