"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgresConnection = void 0;
const data_source_1 = require("../config/data.source");
// TODO: Eliminar ya que no lo estamos usando
const postgresConnection = async () => {
    try {
        console.log("Conexion Exitosa!");
        return await data_source_1.AppDataSource.initialize();
    }
    catch (error) {
        console.log(error);
        throw new Error(`Error trying to connect with Postgres`);
    }
};
exports.postgresConnection = postgresConnection;
//# sourceMappingURL=postgres.config.js.map