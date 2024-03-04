/**
 * Clase `ReservaRoute` que define las rutas relacionadas con las reservas y sus controladores.
 */
import { Router } from 'express';
import { BaseRouter } from '../../../router/base.router';
import { ValidateMiddlewareDTO } from '../middlewares/validate-dto.middleware';
import { ReservaDTO } from '../../../../modules/reserva/infra/typeorm/dtos/ReservaDTO';
import { ReservaController } from '../../../../modules/reserva/useCases/reserva.controller';

/**
 * Clase que representa las rutas para las operaciones CRUD de reservas.
 */
class ReservaRoute extends BaseRouter<ReservaController, ValidateMiddlewareDTO> {
    public path = '/reservas';
    public router = Router();
    public reservaController = new ReservaController();

    /**
     * Constructor de la clase `ReservaRoute`.
     */
    constructor() {
        super(ReservaController, ValidateMiddlewareDTO);
        this.initReservaRoutes();
    }

    /**
     * Método `initReservaRoutes` que inicializa las rutas relacionadas con las reservas.
     */
    public initReservaRoutes() {
        // Obtener todas las reservas
        this.router.get(`${this.path}`, (req, res) => this.reservaController.getAllReservas(req, res));

        // Obtener una reserva por su ID
        this.router.get(`${this.path}/:id`, (req, res) => this.reservaController.getReservaById(req, res));

        // Crear una nueva reserva
        this.router.post(
            `${this.path}`,
            (req, res, next) => {
                console.log('Datos de la solicitud:', req.body); // Imprimir los datos de la solicitud
                return this.middleware.validator(req, res, next, ReservaDTO);
            },
            (req, res) => this.reservaController.createReserva(req, res),
        );

        // Actualizar una reserva por su ID
        this.router.put(`${this.path}/:id`, (req, res) => this.reservaController.updateReserva(req, res));

        // Eliminar una reserva por su ID
        this.router.delete(`${this.path}/:id`, (req, res) => this.reservaController.deleteReservaById(req, res));
    }
}

export default ReservaRoute;
