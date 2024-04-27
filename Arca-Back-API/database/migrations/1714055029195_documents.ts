import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'documents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.integer('category').references('id').inTable('categories').onUpdate('CASCADE').onDelete('CASCADE').notNullable()
      table.string('filename').notNullable()
      table.timestamp('date')
      table.string('description')
      table.integer('location').references('id').inTable('locations').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('creator').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('lastmodifier').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
