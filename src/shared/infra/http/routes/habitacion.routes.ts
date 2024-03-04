/**
 * Clase `HabitacionRoute` que define las rutas relacionadas con las habitaciones y sus controladores.
 */
import { Router } from 'express';
import { BaseRouter } from '../../../router/base.router';
import { ValidateMiddlewareDTO } from '../middlewares/validate-dto.middleware';
import HabitacionController from '../../../../modules/habitacion/useCases/habitacion.controller';
import { HabitacionDTO } from '../../../../modules/habitacion/infra/typeorm/dtos/HabitacionDTO';

/**
 * Clase que representa las rutas para las operaciones relacionadas con las habitaciones.
 */
class HabitacionRoute extends BaseRouter<HabitacionController, ValidateMiddlewareDTO> {
    public path = '/habitaciones';
    public router = Router();
    public habitacionController = new HabitacionController();

    /**
     * Constructor de la clase `HabitacionRoute`.
     */
    constructor() {
        super(HabitacionController, ValidateMiddlewareDTO);
        this.initHabitacionRoutes();
    }

    /**
     * Método `initHabitacionRoutes` que inicializa las rutas relacionadas con las habitaciones.
     */
    public initHabitacionRoutes() {
        // Obtener todas las habitaciones
        this.router.get(`${this.path}`, (req, res) => this.habitacionController.getAllHabitaciones(req, res));

        // Obtener una habitación por su ID
        this.router.get(`${this.path}/:id`, (req, res) => this.habitacionController.getHabitacionById(req, res));

        // Crear una nueva habitación
        this.router.post(
            `${this.path}`,
            (req, res, next) => [this.middleware.validator(req, res, next, HabitacionDTO)],
            (req, res) => this.habitacionController.createHabitacion(req, res),
        );

        // Actualizar una habitación por su ID
        this.router.put(
            `${this.path}/:id`,
            (req, res, next) => [this.middleware.validator(req, res, next, HabitacionDTO)],
            (req, res) => this.habitacionController.updateHabitacion(req, res),
        );

        // Eliminar una habitación por su ID
        this.router.delete(`${this.path}/:id`, (req, res) => this.habitacionController.deleteHabitacionById(req, res));
    }
}

export default HabitacionRoute;
