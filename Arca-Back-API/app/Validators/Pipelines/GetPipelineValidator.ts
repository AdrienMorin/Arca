import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetPipelineValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    s3_name: schema.string({
    })
  })


  public messages: CustomMessages = {}
}
