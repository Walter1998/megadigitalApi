"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonaService = void 0;
const base_service_1 = require("../../config/base.service");
const Persona_entity_1 = require("./infra/typeorm/entities/Persona.entity");
class PersonaService extends base_service_1.BaseService {
    constructor() {
        super(Persona_entity_1.PersonaEntity);
    }
    async getAllPersonas() {
        try {
            console.log(`${PersonaService.name} - getAllPersonas`);
            return (await this.useRepository).find();
        }
        catch (error) {
            console.log('🚀 ~ file: customer.service.ts:17 ~ PersonaService ~ getAllPersonas ~ error:', error);
        }
    }
    async getPersonaById(id) {
        try {
            console.log(`${PersonaService.name} - getPersonaById`);
            return (await this.useRepository).findOne({
                where: { idPersona: id }
            });
        }
        catch (error) {
            console.log('🚀 ~ file: customer.service.ts:26 ~ PersonaService ~ getCustomerById ~ error:', error);
        }
    }
    async createPersona(persona) {
        try {
            console.log(`${PersonaService.name} - createCustomer`);
            return (await this.useRepository).save(persona);
        }
        catch (error) {
            console.log('🚀 ~ file: customer.service.ts:35 ~ PersonaService ~ createCustomer ~ error:', error);
        }
    }
    async updatePersona(id, personaBody) {
        try {
            const result = await (await this.useRepository).update(id, personaBody);
            if (result && result.affected) {
                return result;
            }
            else {
                return null; // Otra opción es lanzar una excepción si no se afecta ninguna fila
            }
        }
        catch (error) {
            console.log('🚀 ~ file: customer.service.ts:44 ~ PersonaService ~ updatePersona ~ error:', error);
            throw new Error('Error al actualizar la persona'); // Lanza una excepción en caso de error
        }
    }
    async deleteCustomerById(id) {
        try {
            return (await this.useRepository).delete(Number(id));
        }
        catch (error) {
            console.log('🚀 ~ file: customer.service.ts:53 ~ PersonaService ~ deleteCustomerById ~ error:', error);
        }
    }
}
exports.PersonaService = PersonaService;
//# sourceMappingURL=persona.service.js.map