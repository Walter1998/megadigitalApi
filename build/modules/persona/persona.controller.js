"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const persona_service_1 = require("./persona.service");
const http_response_1 = require("../../shared/response/http.response");
class PersonaController {
    personaService;
    httpResponse;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(personaService = new persona_service_1.PersonaService(), httpResponse = new http_response_1.HttpResponse()) {
        this.personaService = personaService;
        this.httpResponse = httpResponse;
    }
    async getAllCustomers(_req, res) {
        try {
            console.log(`${PersonaController.name} - getAllCustomers`);
            const personas = await this.personaService.getAllPersonas();
            return this.httpResponse.OK(res, personas);
        }
        catch (error) {
            return this.httpResponse.Error(res, 'error server side in customerCtrl');
        }
    }
    async getPersonaById(req, res) {
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
            const persona = await this.personaService.getPersonaById(id);
            if (persona) {
                return this.httpResponse.OK(res, persona);
            }
            else {
                return this.httpResponse.NotFound(res, 'Persona no encontrada');
            }
        }
        catch (error) {
            return this.httpResponse.Error(res, 'Error del servidor en PersonaCtrl');
        }
    }
    async createPersona(req, res) {
        try {
            const { body } = req;
            const updCustomer = await this.personaService.createPersona(body);
            return this.httpResponse.OK(res, updCustomer);
        }
        catch (error) {
            return this.httpResponse.Error(res, 'error server side in customerCtrl');
        }
    }
    async updatePersona(req, res) {
        try {
            const { id } = req.params;
            const { body } = req;
            const updateResult = await this.personaService.updatePersona(Number(id), body);
            if (updateResult && updateResult.affected) {
                const updatedPersona = await this.personaService.getPersonaById(Number(id));
                return this.httpResponse.OK(res, updatedPersona);
            }
            else {
                return this.httpResponse.NotFound(res, 'Persona no encontrada');
            }
        }
        catch (error) {
            return this.httpResponse.Error(res, 'Error del servidor en PersonaCtrl');
        }
    }
    async deletePersonaById(req, res) {
        try {
            const { id } = req.params;
            const deletedCustomer = await this.personaService.deleteCustomerById(Number(id));
            return this.httpResponse.OK(res, deletedCustomer);
        }
        catch (error) {
            return this.httpResponse.Error(res, 'error server side in customerCtrl');
        }
    }
}
exports.default = PersonaController;
//# sourceMappingURL=persona.controller.js.map