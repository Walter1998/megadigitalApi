// Importar las dependencias necesarias
import { BaseService } from '../../../config/base.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ReservaDTO } from '../infra/typeorm/dtos/ReservaDTO';
import { ReservaEntity } from '../infra/typeorm/entities/reserva.entity';
import { AppError } from '../../../shared/errors/AppError';

// Definir la clase ReservaService que extiende de BaseService
export class ReservaService extends BaseService<ReservaEntity> {
    constructor() {
        super(ReservaEntity); // Llamar al constructor de la clase base con la entidad Reserva
    }

    /**
     * Obtiene todas las reservas.
     * @returns Una lista de reservas.
     */
    async getAllReservas(): Promise<ReservaEntity[] | undefined> {
        try {
            console.log(`${ReservaService.name} - getAllReservas`); // Registrar en consola el inicio del proceso
            return (await this.useRepository).find(); // Obtener todas las reservas de la base de datos
        } catch (error) {
            console.log('Error en getAllReservas:', error); // Manejar errores y registrarlos en consola
        }
    }

    /**
     * Obtiene una reserva por su ID.
     * @param id - El ID de la reserva.
     * @returns La reserva encontrada.
     */
    async getReservaById(id: number): Promise<ReservaEntity | null | undefined> {
        try {
            console.log(`${ReservaService.name} - getReservaById`);
            return (await this.useRepository).findOne({
                where: { id: id }
            }); // Buscar una reserva por su ID en la base de datos
        } catch (error) {
            console.log('Error en getReservaById:', error);
        }
    }

    /**
     * Crea una nueva reserva y calcula el monto de la reserva en función de los días de estadía.
     * @param reserva - Los datos de la reserva a crear.
     * @returns La reserva creada.
     */
    async createReserva(reserva: ReservaDTO): Promise<ReservaEntity | null | undefined> {
        try {
            // Calcular la cantidad de días de la reserva
            const diasReserva = Math.ceil((reserva.fechasalida.getTime() - reserva.fechaentrada.getTime()) / (1000 * 60 * 60 * 24));

            // Calcular el monto de la reserva (Gs. 120.000 por día)
            reserva.montoreserva = diasReserva * 120000;

            console.log(`${ReservaService.name} - createReserva`);
            return (await this.useRepository).save(reserva);
        } catch (error) {
            console.log('Error en createReserva:', error);
        }
    }


    /**
 * Actualiza una reserva por su ID y recalcula el monto de la reserva en función de los días de estadía.
 * @param id - El ID de la reserva a actualizar.
 * @param reservaBody - Los nuevos datos de la reserva.
 * @returns El resultado de la actualización.
 */
    async updateReserva(id: number, reservaBody: ReservaDTO): Promise<UpdateResult | null | undefined> {
        try {
            // Obtener la reserva actual
            const reservaActual = await this.getReservaById(id);

            if (reservaActual) {
                // Verificar y actualizar fechas si es necesario
                const fechaEntrada = reservaBody.fechaentrada || reservaActual.fechaentrada;
                const fechaSalida = reservaBody.fechasalida || reservaActual.fechasalida;

                if (fechaEntrada && fechaSalida) {
                    // Convertir las fechas a instancias de Date si no lo son
                    const fechaEntradaDate = fechaEntrada instanceof Date ? fechaEntrada : new Date(fechaEntrada);
                    const fechaSalidaDate = fechaSalida instanceof Date ? fechaSalida : new Date(fechaSalida);

                    // Calcular montoreserva si las fechas de entrada o salida han sido actualizadas
                    const diasReserva = Math.ceil((fechaSalidaDate.getTime() - fechaEntradaDate.getTime()) / (1000 * 60 * 60 * 24));
                    reservaBody.montoreserva = diasReserva * 120000;
                }
            }

            const result = await (await this.useRepository).update(id, reservaBody);

            if (result && result.affected) {
                return result; // Devolver el resultado de la actualización si se afectó alguna fila
            } else {
                return null;
            }
        } catch (error) {
            throw new AppError('Error al actualizar la reserva'); // Lanzar una excepción en caso de error
        }
    }



    /**
     * Elimina una reserva por su ID.
     * @param id - El ID de la reserva a eliminar.
     * @returns El resultado de la eliminación.
     */
    async deleteReservaById(id: number): Promise<DeleteResult | null | undefined> {
        try {
            return (await this.useRepository).delete(Number(id)); // Eliminar una reserva por su ID de la base de datos
        } catch (error) {
            console.log('Error en deleteReservaById:', error);
        }
    }
}
