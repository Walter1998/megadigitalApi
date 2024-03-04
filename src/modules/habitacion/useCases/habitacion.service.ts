import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../../config/base.service';
import { HabitacionEntity } from '../infra/typeorm/entities/Habitacion.entity';
import { HabitacionDTO } from '../infra/typeorm/dtos/HabitacionDTO';

/**
 * Servicio encargado de la lógica de negocio relacionada con las habitaciones.
 */
export class HabitacionService extends BaseService<HabitacionEntity> {
    /**
     * Constructor del servicio.
     */
    constructor() {
        super(HabitacionEntity);
    }

    /**
     * Obtener todas las habitaciones.
     * @returns Lista de habitaciones o undefined si hay un error.
     */
    async getAllHabitaciones(): Promise<HabitacionEntity[] | undefined> {
        try {
            console.log(`${HabitacionService.name} - getAllHabitaciones`);
            return (await this.useRepository).find();
        } catch (error) {
            console.log('🚀 ~ file: habitacion.service.ts:17 ~ HabitacionService ~ getAllHabitaciones ~ error:', error);
        }
    }

    /**
     * Obtener una habitación por su ID.
     * @param id_habitacion - ID de la habitación a buscar.
     * @returns Habitación correspondiente al ID proporcionado o null si no se encuentra.
     */
    async getHabitacionById(id_habitacion: number): Promise<HabitacionEntity | null | undefined> {
        try {
            console.log(`${HabitacionService.name} - getHabitacionById`);
            return (await this.useRepository).findOne({
                where: { id: id_habitacion },
                relations: ['reserva'], // Si necesitas cargar las relaciones, ajusta según sea necesario
            });
        } catch (error) {
            console.log('🚀 ~ file: habitacion.service.ts:26 ~ HabitacionService ~ getHabitacionById ~ error:', error);
        }
    }

    /**
     * Crear una nueva habitación.
     * @param habitacion - Datos de la nueva habitación.
     * @returns Habitación recién creada o null si hay un error.
     */
    async createHabitacion(habitacion: HabitacionDTO): Promise<HabitacionEntity | null | undefined> {
        try {
            console.log(`${HabitacionService.name} - createHabitacion`);

            // Aquí puedes agregar las verificaciones necesarias antes de guardar la habitación

            return (await this.useRepository).save(habitacion);
        } catch (error) {
            console.log('🚀 ~ file: habitacion.service.ts:35 ~ HabitacionService ~ createHabitacion ~ error:', error);
        }
    }

    /**
     * Actualizar una habitación por su ID.
     * @param id - ID de la habitación a actualizar.
     * @param habitacionBody - Nuevos datos de la habitación.
     * @returns Resultado de la actualización o null si hay un error.
     */
    async updateHabitacion(id: number, habitacionBody: HabitacionDTO): Promise<UpdateResult | null | undefined> {
        try {
            console.log(`${HabitacionService.name} - updateHabitacion`);

            // Aquí puedes agregar las verificaciones necesarias antes de actualizar la habitación

            const result = await (await this.useRepository).update(id, habitacionBody);

            if (result && result.affected) {
                return result;
            } else {
                return null;
            }
        } catch (error) {
            console.log('🚀 ~ file: habitacion.service.ts:44 ~ HabitacionService ~ updateHabitacion ~ error:', error);
            throw new Error('Error al actualizar la habitación');
        }
    }

    /**
     * Eliminar una habitación por su ID.
     * @param id - ID de la habitación a eliminar.
     * @returns Resultado de la eliminación o null si hay un error.
     */
    async deleteHabitacionById(id: number): Promise<DeleteResult | null | undefined> {
        try {
            console.log(`${HabitacionService.name} - deleteHabitacionById`);

            // Aquí puedes agregar las verificaciones necesarias antes de eliminar la habitación

            return (await this.useRepository).delete(id);
        } catch (error) {
            console.log('🚀 ~ file: habitacion.service.ts:53 ~ HabitacionService ~ deleteHabitacionById ~ error:', error);
        }
    }
}
