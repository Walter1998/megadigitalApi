"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_routemap_1 = __importDefault(require("express-routemap"));
const hpp_1 = __importDefault(require("hpp"));
const postgres_config_1 = require("../db/postgres.config");
const config_1 = require("../config/config");
class App extends config_1.ConfigServer {
    app;
    env;
    port;
    server;
    constructor(routes) {
        super();
        this.app = (0, express_1.default)();
        this.env = 'development';
        this.port = 3000;
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeSwagger();
        this.initializeErrorHandling();
    }
    /**
     * getServer
     */
    getServer() {
        return this.app;
    }
    closeServer(done) {
        this.server = this.app.listen(this.port, () => {
            done();
        });
    }
    /**
     * connectToDatabase
     */
    async connectToDatabase() {
        // TODO: Inicializar la conexion
        (0, postgres_config_1.postgresConnection)();
    }
    initializeMiddlewares() {
        this.app.use((0, hpp_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
    }
    /**
     * initializeRoutes
     */
    initializeRoutes(routes) {
        routes.forEach((route) => {
            this.app.use(`/api/`, route.router);
        });
    }
    /**
     * listen
     */
    listen() {
        this.app.listen(this.port, () => {
            (0, express_routemap_1.default)(this.app);
            console.log("Server Corriendo!");
        });
    }
    initializeSwagger() {
        // TODO: init swagger
    }
    initializeErrorHandling() {
        // TODO: Configure error handleing
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map