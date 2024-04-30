import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MongoDbGetValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    _id: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(255)
    ])
      
  })

  public messages: CustomMessages = {}
}
