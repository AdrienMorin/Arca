import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Person from 'App/Models/Person'

export default class Document extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public category: number

  @column()
  public date: DateTime

  @column()
  public description: string

  @column()
  public location: number

  @column()
  public filename: string

  @manyToMany(()=>Person)
  public persons: ManyToMany<typeof Person>

  @column()
  public creator: number

  @column()
  public lastmodifier: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
