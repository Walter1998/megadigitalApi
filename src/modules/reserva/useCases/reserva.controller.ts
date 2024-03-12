import { BaseService } from '../../../config/base.service';
import { ReservaEntity } from '../infra/typeorm/entities/reserva.entity';
import { ReservaDTO } from '../infra/typeorm/dtos/ReservaDTO';
import { ReservaService } from './reserva.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AppError } from '../../../shared/errors/AppError';
import { esFechaMayorQueHoy, esFechaSalidaMayor } from '../../../shared/infra/http/middlewares/fecha-validate';

// Definir la clase ReservaController
export class ReservaController extends BaseService<ReservaEntity> {
    private readonly reservaService: ReservaService;

    constructor() {
        super(ReservaEntity);
        this.reservaService = new ReservaService();  // Inicializar el servicio de reservas
    }

    /**
     * Obtener todas las reservas.
     * @param _req - Objeto de solicitud.
     * @param res - Objeto de respuesta.
     */
    async getAllReservas(_req: any, res: any) {
        try {
            const reservas = await this.reservaService.getAllReservas();
            res.json(reservas);
        } catch (error) {
            console.log('Error en getAllReservas:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    /**
     * Obtener una reserva por su ID.
     * @param req - Objeto de solicitud con el ID de la reserva.
     * @param res - Objeto de respuesta.
     */
    async getReservaById(req: any, res: any) {
        try {
            const id = parseInt(req.params.id);
            const reserva = await this.reservaService.getReservaById(id);

            if (reserva) {
                res.json(reserva);
            } else {
                res.status(404).json({ error: 'Reserva no encontrada' });
            }
        } catch (error) {
            console.log('Error en getReservaById:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    /**
     * Crear una nueva reserva.
     * @param req - Objeto de solicitud con los datos de la reserva.
     * @param res - Objeto de respuesta.
     */
    async createReserva(req: any, res: any) {
        try {
            const nuevaReserva = req.body as ReservaDTO;
            const { persona_id, habitacion_id, fechaentrada, fechasalida, fechareserva } = nuevaReserva;

            // Asignar la persona y la habitación a la reserva
            nuevaReserva.persona_id = persona_id; // Asigna el ID correcto de la persona
            nuevaReserva.habitacion_id = habitacion_id; // Asigna el ID correcto de la habitación

            // Convertir las fechas a instancias de Date
            nuevaReserva.fechasalida = new Date(fechasalida);
            nuevaReserva.fechaentrada = new Date(fechaentrada);

            if (esFechaMayorQueHoy(nuevaReserva.fechaentrada)) {
                if (esFechaSalidaMayor(nuevaReserva.fechaentrada, nuevaReserva.fechasalida)) {

                    // Calcular la cantidad de días de la reserva
                    const diasReserva = Math.ceil((nuevaReserva.fechasalida.getTime() - nuevaReserva.fechaentrada.getTime()) / (1000 * 60 * 60 * 24));

                    // Calcular el monto de la reserva (Gs. 120.000 por día)
                    nuevaReserva.montoreserva = diasReserva * 120000;

                    const reservaCreada = await this.reservaService.createReserva(nuevaReserva);

                    console.log('Reserva Creada:', reservaCreada);

                    res.status(201).json(reservaCreada);
                }else{
                    throw new AppError("La fecha de salida debe ser mayor que la fecha de entrada!");
                }


            } else {
                throw new AppError("La fecha de entrada es menor que la fecha de hoy!");
            }
        } catch (error) {
            console.log('Error en createReserva:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    /**
     * Actualizar una reserva por su ID.
     * @param req - Objeto de solicitud con el ID de la reserva y los nuevos datos.
     * @param res - Objeto de respuesta.
     */
    async updateReserva(req: any, res: any) {
        try {
            const id = parseInt(req.params.id);
            const nuevosDatos = req.body as ReservaDTO;

            const resultado = await this.reservaService.updateReserva(id, nuevosDatos);

            if (resultado && resultado.affected) {
                res.json({ mensaje: 'Reserva actualizada exitosamente' });
            } else {
                res.status(404).json({ error: 'Reserva no encontrada' });
            }
        } catch (error) {
            console.log('Error en updateReserva:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    /**
     * Eliminar una reserva por su ID.
     * @param req - Objeto de solicitud con el ID de la reserva.
     * @param res - Objeto de respuesta.
     */
    async deleteReservaById(req: any, res: any) {
        try {
            const id = parseInt(req.params.id);
            const resultado = await this.reservaService.deleteReservaById(id);

            if (resultado && resultado.affected) {
                res.json({ mensaje: 'Reserva eliminada exitosamente' });
            } else {
                res.status(404).json({ error: 'Reserva no encontrada' });
            }
        } catch (error) {
            console.log('Error en deleteReservaById:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}
