import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddEmailColumnToUser1625093108978 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'email',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn('users', 'email');
  }
}
