import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MongoDbValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    _id: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(255)
    ]),
    titre: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(255)
    ]),
    description: schema.string.optional({}, [
      rules.minLength(3),
      rules.maxLength(2550)
    ]),
    retranscription: schema.string.optional({}, [
      rules.minLength(3),
      rules.maxLength(2550)
    ]),
    s3_id: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(255)
    ]),
    date: schema.date.optional({}, [
    ]),
    dateDeFin: schema.date.optional({}, [
    ]),
    createur: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(255)
    ]),
    dateDeCreation: schema.date({}, [
    ]),
    derniereModifPar: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(255)
    ]),
    dateDeDerniereModfi: schema.date({}, [
    ]),
    personnes: schema.string.optional({}, [
      rules.minLength(3),
      rules.maxLength(255)
    ]),
    catégories: schema.string.optional({}, [
      rules.minLength(3),
      rules.maxLength(255)
    ]),
    villes: schema.string.optional({}, [
      rules.minLength(3),
      rules.maxLength(255)
    ]),
  })

  public messages: CustomMessages = {}
}
