import {schema, CustomMessages} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ModifyDocValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    titre: schema.string.optional({
    }),
    description: schema.string.optional({
    }),
    mongoDB: schema.string.optional({
    }),
    retranscription: schema.string.optional({
    }),
    date: schema.object.optional().members({
      start: schema.date.optional(),
      end: schema.date.optional(),
    }),
    personnes: schema.string.optional({
    }),
    categories: schema.string.optional({
    }),
    villes: schema.string.optional({
    }),
    id:schema.string.optional({
    }),
  })

  public messages: CustomMessages = {}
}
