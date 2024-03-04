"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const base_router_1 = require("../../../router/base.router");
const persona_controller_1 = __importDefault(require("../../../../modules/persona/persona.controller"));
const validate_dto_middleware_1 = require("../middlewares/validate-dto.middleware");
const ICreatePersonaDTO_1 = require("../../../../modules/persona/infra/typeorm/dtos/ICreatePersonaDTO");
class PersonaRoute extends base_router_1.BaseRouter {
    path = '/personas';
    router = (0, express_1.Router)();
    personaController = new persona_controller_1.default();
    constructor() {
        super(persona_controller_1.default, validate_dto_middleware_1.ValidateMiddlewareDTO);
        this.initCustomerRoutes();
    }
    initCustomerRoutes() {
        this.router.get(`${this.path}`, (req, res) => this.personaController.getAllCustomers(req, res));
        this.router.get(`${this.path}/:id`, (req, res) => this.personaController.getPersonaById(req, res));
        this.router.post(`${this.path}`, (req, res, next) => [this.middleware.validator(req, res, next, ICreatePersonaDTO_1.ICreatePersonaDTO)], (req, res) => this.personaController.createPersona(req, res));
        this.router.put(`${this.path}/:id`, (req, res) => this.personaController.updatePersona(req, res));
        this.router.delete(`${this.path}/:id`, (req, res) => this.personaController.deletePersonaById(req, res));
    }
}
exports.default = PersonaRoute;
//# sourceMappingURL=per.routes.js.map