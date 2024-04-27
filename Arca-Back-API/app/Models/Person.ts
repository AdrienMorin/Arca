import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany,manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Document from 'App/Models/Document'

export default class Person extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @manyToMany(()=>Document)
  public documents: ManyToMany<typeof Document>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
