import { MigrationInterface, QueryRunner, Table } from "typeorm";



export class CreateUsers1655310773883 implements MigrationInterface {

    // yarn typeorm migration:create -n CreateUsers

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(

            new Table({

                name: "users",

                columns: [

                    {

                        name: "id",

                        type: "uuid",

                        isPrimary: true,

                    },

                    {

                        name: "name",

                        type: "varchar",

                    },

                    {

                        name: "username",

                        type: "varchar",

                        isUnique: true,

                    },

                    {

                        name: "password",

                        type: "varchar",

                    },

                    {

                        name: "email",

                        type: "varchar",

                    },

                    {

                        name: "driver_licence",

                        type: "varchar",

                    },

                    {

                        name: "isAdmin",

                        type: "boolean",

                        default: false,

                    },

                    {

                        name: "avatar",

                        type: "varchar",

                    },

                    {

                        name: "create_at",

                        type: "timestamp",

                        default: "now()",

                    },

                ],

            })

        );

    }



    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("users");

    }

}

