import {schema, CustomMessages} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BasicUploadPipelineValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    titre: schema.string({
    }),
    description: schema.string.optional({
    }),
    mongoDB: schema.string.optional({
    }),
    retranscription: schema.string.optional({
    }),
    date: schema.date.optional({
    }),
    dateDeFin: schema.date.optional({
    }),
    personnes: schema.string.optional({
    }),
    categories: schema.string.optional({
    }),
    villes: schema.string.optional({
    })
  })

  public messages: CustomMessages = {}
}
