import { Response, Request } from 'express';
import { PersonaService } from './persona.service';
import { HttpResponse } from '../../../shared/response/http.response';

class PersonaController {
    /**
     * Constructor de la clase PersonaController.
     * @param personaService - Servicio encargado de la lógica de negocio relacionada con las personas.
     * @param httpResponse - Objeto para manejar las respuestas HTTP.
     */
    constructor(
        private readonly personaService: PersonaService = new PersonaService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) { }

    /**
     * Método para obtener todas las personas.
     * @param _req - Objeto de solicitud (request).
     * @param res - Objeto de respuesta (response).
     * @returns Respuesta HTTP con la lista de personas o un mensaje de error.
     */
    async getAllCustomers(_req: Request, res: Response) {
        try {
            console.log(`${PersonaController.name} - getAllCustomers`);
            const personas = await this.personaService.getAllPersonas();
            return this.httpResponse.OK(res, personas);
        } catch (error) {
            return this.httpResponse.Error(res, 'Error interno del servidor en PersonaCtrl');
        }
    }

    /**
     * Método para obtener una persona por su ID.
     * @param req - Objeto de solicitud (request) que puede contener el ID en los parámetros de la ruta o la consulta.
     * @param res - Objeto de respuesta (response).
     * @returns Respuesta HTTP con la persona encontrada o un mensaje de error.
     */
    async getPersonaById(req: Request, res: Response) {
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

            const persona = await this.personaService.getPersonaById(id);

            if (persona) {
                return this.httpResponse.OK(res, persona);
            } else {
                return this.httpResponse.NotFound(res, 'Persona no encontrada');
            }
        } catch (error) {
            return this.httpResponse.Error(res, 'Error interno del servidor en PersonaCtrl');
        }
    }

    /**
     * Método para crear una nueva persona.
     * @param req - Objeto de solicitud (request) con los datos de la persona en el cuerpo (body).
     * @param res - Objeto de respuesta (response).
     * @returns Respuesta HTTP con la persona recién creada o un mensaje de error.
     */
    async createPersona(req: Request, res: Response) {
        try {
            const { body } = req;
            const updCustomer = await this.personaService.createPersona(body);
            return this.httpResponse.OK(res, updCustomer);
        } catch (error) {
            return this.httpResponse.Error(res, 'Error interno del servidor en PersonaCtrl');
        }
    }

    /**
     * Método para actualizar una persona por su ID.
     * @param req - Objeto de solicitud (request) con el ID en los parámetros de la ruta y los nuevos datos en el cuerpo (body).
     * @param res - Objeto de respuesta (response).
     * @returns Respuesta HTTP con la persona actualizada o un mensaje de error.
     */
    async updatePersona(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { body } = req;

            const updateResult = await this.personaService.updatePersona(Number(id), body);

            if (updateResult && updateResult.affected) {
                const updatedPersona = await this.personaService.getPersonaById(Number(id));
                return this.httpResponse.OK(res, updatedPersona);
            } else {
                return this.httpResponse.NotFound(res, 'Persona no encontrada');
            }
        } catch (error) {
            return this.httpResponse.Error(res, 'Error interno del servidor en PersonaCtrl');
        }
    }

    /**
     * Método para eliminar una persona por su ID.
     * @param req - Objeto de solicitud (request) con el ID en los parámetros de la ruta.
     * @param res - Objeto de respuesta (response).
     * @returns Respuesta HTTP con la persona eliminada o un mensaje de error.
     */
    async deletePersonaById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedCustomer = await this.personaService.deletePersonaById(Number(id));
            return this.httpResponse.OK(res, deletedCustomer);
        } catch (error) {
            return this.httpResponse.Error(res, 'Error interno del servidor en PersonaCtrl');
        }
    }

}

export default PersonaController;
