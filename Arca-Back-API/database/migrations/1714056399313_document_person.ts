import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'document_person'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('document_id').references('id').inTable('documents').onUpdate('CASCADE').onDelete('CASCADE').notNullable()
      table.integer('person_id').references('id').inTable('people').onUpdate('CASCADE').onDelete('CASCADE').notNullable()
      table.unique(['document_id', 'person_id'])

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
