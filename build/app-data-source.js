"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.myDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "ep-broad-dawn-a4lbf4j5.us-east-1.aws.neon.tech",
    username: "Walter1998",
    password: "m7faEZYb4lKd",
    database: "railway",
    port: 5432,
    migrations: ['src/**database/migrations/*.ts'],
    entities: ["src/entity/*.js"],
    logging: true,
    synchronize: true,
});
//# sourceMappingURL=app-data-source.js.map