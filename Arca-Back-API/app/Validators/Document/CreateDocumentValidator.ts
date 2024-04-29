import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateDocumentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.required(),
      rules.trim(),
      rules.escape(),
      rules.minLength(3),
      rules.maxLength(255)
    ]),
    category: schema.number(),
    location: schema.number(),
    description: schema.string({},[
      rules.trim(),
      rules.escape(),
      rules.minLength(3),
      rules.maxLength(255)
    ]),
    date: schema.date(),
    file: schema.file({
      size: '100mb',
      extnames: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx','jpg','png','jpeg','webp']
    }),
    persons: schema.array().members(schema.number())
  })

  public messages: CustomMessages = {}
}
