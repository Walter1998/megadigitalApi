/**
 * Clase `BaseRouter` que sirve como base para la creación de enrutadores en Express.
 * @template T - Tipo del controlador.
 * @template U - Tipo del middleware.
 */
import { Router } from 'express';

export class BaseRouter<T, U> {
    public router: Router;
    public controller: T;
    public middleware: U;

    /**
     * Constructor de la clase `BaseRouter`.
     * @param TController - Clase del controlador.
     * @param UMiddleware - Clase del middleware.
     */
    constructor(TController: { new(): T }, UMiddleware: { new(): U }) {
        this.router = Router();
        this.controller = new TController();
        this.middleware = new UMiddleware();
        this.routes();
    }

    /**
     * Método `routes` que debe ser implementado por las clases hijas para definir las rutas.
     * @abstract
     */
    routes() { }
}
