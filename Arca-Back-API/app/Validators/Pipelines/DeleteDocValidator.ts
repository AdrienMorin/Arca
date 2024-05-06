import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DeleteDocValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    id: schema.string({
    }),
    db: schema.string({
    })
  })


  public messages: CustomMessages = {}
}
