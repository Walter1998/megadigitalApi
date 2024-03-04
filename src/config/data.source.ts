import { DataSource, DataSourceOptions } from "typeorm";
import { join } from "path";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

// Opciones de configuración para la conexión a la base de datos
const configDBConnection: DataSourceOptions = {
    type: "postgres", // Tipo de base de datos
    host: "ep-morning-queen-a5q078iw.us-east-2.aws.neon.tech", // Dirección del servidor de la base de datos
    username: "Walter1998", // Nombre de usuario para la conexión
    password: "pHGOF0brLt3x", // Contraseña para la conexión
    database: "testmega", // Nombre de la base de datos
    port: 5432, // Puerto de la base de datos
    logging: false, // Desactiva los registros de consultas SQL en la consola
    synchronize: true, // Sincroniza automáticamente las entidades con la base de datos (en entornos de desarrollo)
    migrationsRun: false, // No ejecutar automáticamente las migraciones al inicio
    ssl: {
        "rejectUnauthorized": false // Configuración SSL, en este caso, se deshabilita la verificación del certificado
    },
    entities: [join(__dirname, "../**/*.entity{.ts,.js}")], // Rutas de los archivos de las entidades de la base de datos
    migrations: [join(__dirname, "../**/*.migration{.ts,.js}")], // Rutas de los archivos de migraciones
    subscribers: [join(__dirname, "../**/*.subscriber{.ts,.js}")], // Rutas de los archivos de suscriptores
    namingStrategy: new SnakeNamingStrategy() // Estrategia de nombramiento de tablas utilizando el formato snake_case
}

// Creación de la fuente de datos (DataSource) utilizando las opciones de configuración
export const AppDataSource: DataSource = new DataSource(configDBConnection);
