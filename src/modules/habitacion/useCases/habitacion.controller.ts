import { Response, Request } from 'express';
import { HabitacionService } from './habitacion.service';
import { HttpResponse } from '../../../shared/response/http.response';

/**
 * Controlador para la gestión de operaciones relacionadas con las habitaciones.
 */
class HabitacionController {
    /**
     * Constructor del controlador.
     * @param habitacionService - Servicio encargado de la lógica de negocio de las habitaciones.
     * @param httpResponse - Utilidad para generar respuestas HTTP estandarizadas.
     */
    constructor(
        private readonly habitacionService: HabitacionService = new HabitacionService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) { }

    /**
     * Obtener todas las habitaciones.
     * @param _req - Objeto de solicitud (no utilizado en este método).
     * @param res - Objeto de respuesta HTTP.
     * @returns Respuesta con todas las habitaciones o error en caso de fallo.
     */
    async getAllHabitaciones(_req: Request, res: Response) {
        try {
            console.log(`${HabitacionController.name} - getAllHabitaciones`);
            const habitaciones = await this.habitacionService.getAllHabitaciones();
            return this.httpResponse.OK(res, habitaciones);
        } catch (error) {
            return this.httpResponse.Error(res, 'Error del servidor en HabitacionCtrl');
        }
    }

    /**
     * Obtener una habitación por su ID.
     * @param req - Objeto de solicitud con el ID de la habitación.
     * @param res - Objeto de respuesta HTTP.
     * @returns Habitación correspondiente al ID proporcionado o error en caso de fallo.
     */
    async getHabitacionById(req: Request, res: Response) {
        try {
            let id: number | undefined;

            // Intenta obtener el ID de los parámetros de la ruta
            if (req.params.id) {
                id = parseInt(req.params.id, 10);
            }

            // Si no se encuentra el ID en la ruta, intenta obtenerlo de los parámetros de consulta
            if (id === undefined && req.query.id) {
                id = parseInt(req.query.id as string, 10);
            }

            // Si no se encuentra el ID en ninguna parte, responde con un error
            if (id === undefined) {
                return this.httpResponse.BadRequest(res, 'Parámetro ID no proporcionado');
            }

            const habitacion = await this.habitacionService.getHabitacionById(id);

            if (habitacion) {
                return this.httpResponse.OK(res, habitacion);
            } else {
                return this.httpResponse.NotFound(res, 'Habitación no encontrada');
            }
        } catch (error) {
            return this.httpResponse.Error(res, 'Error del servidor en HabitacionCtrl');
        }
    }

    /**
     * Crear una nueva habitación.
     * @param req - Objeto de solicitud con los datos de la habitación.
     * @param res - Objeto de respuesta HTTP.
     * @returns Habitación recién creada o error en caso de fallo.
     */
    async createHabitacion(req: Request, res: Response) {
        try {
            const { body } = req;
            const newHabitacion = await this.habitacionService.createHabitacion(body);
            return this.httpResponse.OK(res, newHabitacion);
        } catch (error) {
            return this.httpResponse.Error(res, 'Error del servidor en HabitacionCtrl');
        }
    }

    /**
     * Actualizar una habitación por su ID.
     * @param req - Objeto de solicitud con el ID de la habitación y los nuevos datos.
     * @param res - Objeto de respuesta HTTP.
     * @returns Habitación actualizada o error en caso de fallo.
     */
    async updateHabitacion(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { body } = req;

            const updateResult = await this.habitacionService.updateHabitacion(Number(id), body);

            if (updateResult && updateResult.affected) {
                const updatedHabitacion = await this.habitacionService.getHabitacionById(Number(id));
                return this.httpResponse.OK(res, updatedHabitacion);
            } else {
                return this.httpResponse.NotFound(res, 'Habitación no encontrada');
            }
        } catch (error) {
            return this.httpResponse.Error(res, 'Error del servidor en HabitacionCtrl');
        }
    }

    /**
     * Eliminar una habitación por su ID.
     * @param req - Objeto de solicitud con el ID de la habitación.
     * @param res - Objeto de respuesta HTTP.
     * @returns Mensaje de éxito o error en caso de fallo.
     */
    async deleteHabitacionById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedHabitacion = await this.habitacionService.deleteHabitacionById(Number(id));
            return this.httpResponse.OK(res, deletedHabitacion);
        } catch (error) {
            return this.httpResponse.Error(res, 'Error del servidor en HabitacionCtrl');
        }
    }
}

export default HabitacionController;

