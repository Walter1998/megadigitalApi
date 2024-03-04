"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitacionService = void 0;
const base_service_1 = require("../../../config/base.service");
const Habitacion_1 = require("../infra/typeorm/entities/Habitacion");
class HabitacionService extends base_service_1.BaseService {
    constructor() {
        super(Habitacion_1.HabitacionEntity);
    }
    async getAllHabitaciones() {
        try {
            console.log(`${HabitacionService.name} - getAllHabitaciones`);
            return (await this.useRepository).find();
        }
        catch (error) {
            console.log('🚀 ~ file: habitacion.service.ts:17 ~ HabitacionService ~ getAllHabitaciones ~ error:', error);
        }
    }
    async getHabitacionById(id) {
        try {
            console.log(`${HabitacionService.name} - getHabitacionById`);
            return (await this.useRepository).findOne({
                where: { id }
            });
        }
        catch (error) {
            console.log('🚀 ~ file: habitacion.service.ts:26 ~ HabitacionService ~ getHabitacionById ~ error:', error);
        }
    }
    async createHabitacion(habitacion) {
        try {
            console.log(`${HabitacionService.name} - createHabitacion`);
            // Aquí puedes agregar las verificaciones necesarias antes de guardar la habitación
            return (await this.useRepository).save(habitacion);
        }
        catch (error) {
            console.log('🚀 ~ file: habitacion.service.ts:35 ~ HabitacionService ~ createHabitacion ~ error:', error);
        }
    }
    async updateHabitacion(id, habitacionBody) {
        try {
            console.log(`${HabitacionService.name} - updateHabitacion`);
            // Aquí puedes agregar las verificaciones necesarias antes de actualizar la habitación
            const result = await (await this.useRepository).update(id, habitacionBody);
            if (result && result.affected) {
                return result;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.log('🚀 ~ file: habitacion.service.ts:44 ~ HabitacionService ~ updateHabitacion ~ error:', error);
            throw new Error('Error al actualizar la habitación');
        }
    }
    async deleteHabitacionById(id) {
        try {
            console.log(`${HabitacionService.name} - deleteHabitacionById`);
            // Aquí puedes agregar las verificaciones necesarias antes de eliminar la habitación
            return (await this.useRepository).delete(id);
        }
        catch (error) {
            console.log('🚀 ~ file: habitacion.service.ts:53 ~ HabitacionService ~ deleteHabitacionById ~ error:', error);
        }
    }
}
exports.HabitacionService = HabitacionService;
//# sourceMappingURL=habitacion.service.js.map