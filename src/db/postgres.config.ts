import { DataSource } from "typeorm";
import { AppDataSource } from "../config/data.source";

// TODO: Este archivo no se está utilizando actualmente y puede eliminarse

// Función para establecer la conexión con la base de datos PostgreSQL
export const postgresConnection = async (): Promise<DataSource> => {
    try {
        console.log("Conexion Exitosa!"); // Mensaje de éxito en la consola
        return await AppDataSource.initialize(); // Inicializa y retorna la fuente de datos (DataSource)
    } catch (error) {
        console.log(error); // Registra cualquier error en la consola
        throw new Error(`Error trying to connect with Postgres`); // Lanza un error indicando problemas en la conexión
    }
};
