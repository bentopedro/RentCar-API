import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../../../../shared/infra/database";
import { app } from "../../../../shared/infra/http/app";

let connection: Connection;
describe("Create Category  Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin", 8);

        await connection.query(
            `insert into users(id, name, email, password, "isAdmin", created_at, driver_license) values ('${id}', 'administrator', 'admin@rentcar.com.br', '${password}', true, 'now()', 'AAAAA')`
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to create a new category", async () => {
        const respToken = await request(app).post("/sessions").send({
            email: "admin@rentcar.com.br",
            password: "admin",
        });

        // console.log(respToken.body.token);
        const { token } = respToken.body;

        const resp = await request(app)
            .post("/categories")
            .send({
                name: "Category name supertest",
                description: "Category description supertest",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(resp.status).toBe(201);
    });

    it("should not be able to create a new category with name exists", async () => {
        const respToken = await request(app).post("/sessions").send({
            email: "admin@rentcar.com.br",
            password: "admin",
        });

        // console.log(respToken.body.token);
        const { token } = respToken.body;

        const response = await request(app)
            .post("/categories")
            .send({
                name: "Category name supertest",
                description: "Category description supertest",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
    });
});
