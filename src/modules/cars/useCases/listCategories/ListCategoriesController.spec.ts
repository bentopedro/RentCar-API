import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../../../../shared/infra/database";
import { app } from "../../../../shared/infra/http/app";

let connection: Connection;
describe("List Category  Controller", () => {
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

    it("should be able to list all categories", async () => {
        const respToken = await request(app).post("/sessions").send({
            email: "admin@rentcar.com.br",
            password: "admin",
        });

        // console.log(respToken.body.token);
        const { token } = respToken.body;

        await request(app)
            .post("/categories")
            .send({
                name: "Category name supertest",
                description: "Category description supertest",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        const response = await request(app)
            .get("/categories")
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual("Category name supertest");
    });
});
