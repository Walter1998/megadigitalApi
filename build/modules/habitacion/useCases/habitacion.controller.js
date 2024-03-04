"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const habitacion_service_1 = require("./habitacion.service");
const http_response_1 = require("../../../shared/response/http.response");
class HabitacionController {
    habitacionService;
    httpResponse;
    constructor(habitacionService = new habitacion_service_1.HabitacionService(), httpResponse = new http_response_1.HttpResponse()) {
        this.habitacionService = habitacionService;
        this.httpResponse = httpResponse;
    }
    async getAllHabitaciones(_req, res) {
        try {
            console.log(`${HabitacionController.name} - getAllHabitaciones`);
            const habitaciones = await this.habitacionService.getAllHabitaciones();
            return this.httpResponse.OK(res, habitaciones);
        }
        catch (error) {
            return this.httpResponse.Error(res, 'Error del servidor en HabitacionCtrl');
        }
    }
    async getHabitacionById(req, res) {
        try {
            let id;
            // Intenta obtener el ID de los parámetros de la ruta
            if (req.params.id) {
                id = parseInt(req.params.id, 10);
            }
            // Si no se encuentra el ID en la ruta, intenta obtenerlo de los parámetros de consulta
            if (id === undefined && req.query.id) {
                id = parseInt(req.query.id, 10);
            }
            // Si no se encuentra el ID en ninguna parte, responde con un error
            if (id === undefined) {
                return this.httpResponse.BadRequest(res, 'Parámetro ID no proporcionado');
            }
            const habitacion = await this.habitacionService.getHabitacionById(id);
            if (habitacion) {
                return this.httpResponse.OK(res, habitacion);
            }
            else {
                return this.httpResponse.NotFound(res, 'Habitación no encontrada');
            }
        }
        catch (error) {
            return this.httpResponse.Error(res, 'Error del servidor en HabitacionCtrl');
        }
    }
    async createHabitacion(req, res) {
        try {
            const { body } = req;
            const newHabitacion = await this.habitacionService.createHabitacion(body);
            return this.httpResponse.OK(res, newHabitacion);
        }
        catch (error) {
            return this.httpResponse.Error(res, 'Error del servidor en HabitacionCtrl');
        }
    }
    async updateHabitacion(req, res) {
        try {
            const { id } = req.params;
            const { body } = req;
            const updateResult = await this.habitacionService.updateHabitacion(Number(id), body);
            if (updateResult && updateResult.affected) {
                const updatedHabitacion = await this.habitacionService.getHabitacionById(Number(id));
                return this.httpResponse.OK(res, updatedHabitacion);
            }
            else {
                return this.httpResponse.NotFound(res, 'Habitación no encontrada');
            }
        }
        catch (error) {
            return this.httpResponse.Error(res, 'Error del servidor en HabitacionCtrl');
        }
    }
    async deleteHabitacionById(req, res) {
        try {
            const { id } = req.params;
            const deletedHabitacion = await this.habitacionService.deleteHabitacionById(Number(id));
            return this.httpResponse.OK(res, deletedHabitacion);
        }
        catch (error) {
            return this.httpResponse.Error(res, 'Error del servidor en HabitacionCtrl');
        }
    }
}
exports.default = HabitacionController;
//# sourceMappingURL=habitacion.controller.js.map