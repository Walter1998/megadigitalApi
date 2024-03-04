"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const path_1 = require("path");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const configDBConnection = {
    type: "mysql",
    host: "bsckptso8l5y81nkdimj-mysql.services.clever-cloud.com",
    username: "upgkxixnpaan4tff",
    password: "m29bq9MeF0S3m45bqG5p",
    database: "bsckptso8l5y81nkdimj",
    port: 3306,
    logging: false,
    synchronize: true,
    migrationsRun: false,
    ssl: {
        "rejectUnauthorized": false
    },
    entities: [(0, path_1.join)(__dirname, "../**/*.entity{.ts,.js}")],
    migrations: [(0, path_1.join)(__dirname, "../**/*.migration{.ts,.js}")],
    subscribers: [(0, path_1.join)(__dirname, "../**/*.subscriber{.ts,.js}")],
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy()
};
exports.AppDataSource = new typeorm_1.DataSource(configDBConnection);
//# sourceMappingURL=data.source.js.map