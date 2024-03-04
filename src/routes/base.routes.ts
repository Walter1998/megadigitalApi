import { Router, Request, Response } from 'express';
import { Routes } from '../interfaces/routes.interface';

/**
 * Clase base para rutas que verifican la salud de la API.
 * Implementa la interfaz Routes.
 */
class BaseRoute implements Routes {
    public path = '/alive';
    public router = Router();

    /**
     * Constructor de la clase BaseRoute.
     * Inicializa las rutas base.
     */
    constructor() {
        this.initBaseRoutes();
    }

    /**
     * Inicializa las rutas base para verificar la salud de la API.
     */
    public initBaseRoutes() {
        // Ruta para verificar la salud de la API
        this.router.get(`${this.path}`, (_req: Request, res: Response) => {
            res.status(200).json({ ok: true, message: `I AM API AND I AM ALIVE` });
        });
    }
}

export default BaseRoute;
