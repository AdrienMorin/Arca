import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateLocationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    displayname : schema.string({}, [
      rules.required(),
      rules.trim(),
      rules.escape(),
      rules.minLength(3),
      rules.maxLength(255)
    ]),
    cityname : schema.string({}, [
      rules.required(),
      rules.trim(),
      rules.escape(),
      rules.minLength(3),
      rules.maxLength(255)
    ]),
    regionname : schema.string({}, [
      rules.required(),
      rules.trim(),
      rules.escape(),
      rules.minLength(3),
      rules.maxLength(255)
    ]),
    zipcode : schema.string.optional({}, [
      rules.trim(),
      rules.escape(),
      rules.minLength(3),
      rules.maxLength(255)
    ]),
    country : schema.string({}, [
      rules.required(),
      rules.trim(),
      rules.escape(),
      rules.minLength(3),
      rules.maxLength(255)
    ])
  })

  public messages: CustomMessages = {}
}
