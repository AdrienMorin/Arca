import { rules,schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateCategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    oldName : schema.string({}, [
      rules.required(),
      rules.trim(),
      rules.escape(),
      rules.minLength(3),
      rules.maxLength(255)
    ]),
    newName : schema.string({}, [
      rules.required(),
      rules.trim(),
      rules.escape(),
      rules.minLength(3),
      rules.maxLength(255)
    ])
  })

  public messages: CustomMessages = {}
}
