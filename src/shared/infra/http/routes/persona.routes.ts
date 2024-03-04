/**
 * Clase `PersonaRoute` que define las rutas relacionadas con las personas y sus controladores.
 */
import { Router } from 'express';
import { BaseRouter } from '../../../router/base.router';
import PersonaController from '../../../../modules/persona/useCases/persona.controller';
import { ValidateMiddlewareDTO } from '../middlewares/validate-dto.middleware';
import { ICreatePersonaDTO } from '../../../../modules/persona/infra/typeorm/dtos/ICreatePersonaDTO';

/**
 * Clase que representa las rutas para las operaciones relacionadas con las personas.
 */
class PersonaRoute extends BaseRouter<PersonaController, ValidateMiddlewareDTO> {
    public path = '/personas';
    public router = Router();
    public personaController = new PersonaController();

    /**
     * Constructor de la clase `PersonaRoute`.
     */
    constructor() {
        super(PersonaController, ValidateMiddlewareDTO);
        this.initCustomerRoutes();
    }

    /**
     * Método `initCustomerRoutes` que inicializa las rutas relacionadas con las personas.
     */
    public initCustomerRoutes() {
        // Obtener todas las personas
        this.router.get(`${this.path}`, (req, res) => this.personaController.getAllCustomers(req, res));

        // Obtener una persona por su ID
        this.router.get(`${this.path}/:id`, (req, res) => this.personaController.getPersonaById(req, res));

        // Crear una nueva persona
        this.router.post(
            `${this.path}`,
            (req, res, next) => [this.middleware.validator(req, res, next, ICreatePersonaDTO)],
            (req, res) => this.personaController.createPersona(req, res),
        );

        // Actualizar una persona por su ID
        this.router.put(`${this.path}/:id`, (req, res) => this.personaController.updatePersona(req, res));

        // Eliminar una persona por su ID
        this.router.delete(`${this.path}/:id`, (req, res) => this.personaController.deletePersonaById(req, res));
    }
}

export default PersonaRoute;
