/**
 * Clase `App` que representa la aplicación Express.
 */
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import displayRoutes from 'express-routemap';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
//import * as swaggerDocument from '../swagger.json';
import YAML from 'yamljs';

import { DataSource } from 'typeorm';
import path, { join } from 'path';
import { Routes } from '../interfaces/routes.interface';
import { postgresConnection } from '../db/postgres.config';
import { ConfigServer } from '../config/config';

class App extends ConfigServer {
    public app: express.Application;
    public env: string;
    public port: string;
    public server: any;
    public host: string;

    /**
     * Constructor de la clase `App`.
     * @param routes - Lista de rutas de la aplicación.
     */
    constructor(routes: Routes[]) {
        super();
        this.app = express();
        this.env = 'development';
        this.port = process.env.PORT ?? "3000";
        this.host = "0.0.0.0"

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeSwagger();
        this.initializeErrorHandling();
    }

    /**
     * Método que devuelve la instancia de la aplicación Express.
     * @returns La aplicación Express.
     */
    public getServer() {
        return this.app;
    }

    /**
     * Método para cerrar el servidor Express.
     * @param done - Función de retorno opcional para manejar el cierre del servidor.
     */
    public closeServer(done?: any) {
        this.server = this.app.listen(this.port, () => {
            done();
        });
    }

    /**
     * Método privado para conectarse a la base de datos.
     * @returns Una promesa que representa la conexión a la base de datos.
     */
    private async connectToDatabase(): Promise<DataSource | void> {
        // TODO: Inicializar la conexión a la base de datos
        postgresConnection();
    }

    /**
     * Método privado para inicializar los middlewares de la aplicación.
     */
    private initializeMiddlewares() {
        this.app.use(hpp());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        // TODO: Agregar middlewares como cors, helmet, morgan según sea necesario
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan('combined')); // Opcionalmente, configurar el formato de registro
    }

    /**
     * Método público para inicializar las rutas de la aplicación.
     * @param routes - Lista de rutas de la aplicación.
     */
    public initializeRoutes(routes: Routes[]) {
        routes.forEach((route) => {
            this.app.use(`/api/`, route.router);
        });
    }

    /**
     * Método privado para iniciar la documentación Swagger.
     */
    private initializeSwagger() {
        // TODO: Inicializar Swagger
        const swaggerDocument = YAML.load(path.join(__dirname, '..', 'swagger.yaml'));
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    }

    /**
     * Método privado para inicializar el manejo de errores.
     */
    private initializeErrorHandling() {
        // TODO: Configurar manejo de errores
    }

    /**
     * Método público para iniciar la escucha del servidor.
     */
    public listen(port: number, host: string = '0.0.0.0') {
        this.app.listen(port, host, () => {
            displayRoutes(this.app);
            console.log("Server Corriendo!");
        });
    }
}

export default App;
