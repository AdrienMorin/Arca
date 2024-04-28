import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class AwsFileUploadValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    file: schema.file({
      size: '200mb',
      extnames: ['jpg', 'gif', 'png','pdf','doc','docx','xls','xlsx','ppt','pptx','jpeg','webp'],
    }),
  })

  public messages: CustomMessages = {}
}
