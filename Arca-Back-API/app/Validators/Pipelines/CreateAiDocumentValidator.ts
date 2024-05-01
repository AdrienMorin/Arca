import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAiDocumentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    file: schema.file({
      size: '10mb',
      extnames: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx','jpg','png','jpeg','webp','mp3','wav','aac']
    })
  })

  public messages: CustomMessages = {}
}
