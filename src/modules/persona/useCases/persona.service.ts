import { BaseService } from '../../../config/base.service';
import { PersonaEntity } from '../infra/typeorm/entities/Persona.entity';
import { ICreatePersonaDTO } from '../infra/typeorm/dtos/ICreatePersonaDTO';
import { DeleteResult, EntityNotFoundError, UpdateResult } from 'typeorm';

/**
 * Servicio encargado de la lógica de negocio relacionada con las personas.
 */
export class PersonaService extends BaseService<PersonaEntity> {
    /**
     * Constructor del servicio.
     */
    constructor() {
        super(PersonaEntity);
    }

    /**
     * Obtener todas las personas.
     * @returns Lista de personas o undefined si hay un error.
     */
    async getAllPersonas(): Promise<PersonaEntity[] | undefined> {
        try {
            console.log(`${PersonaService.name} - getAllPersonas`);
            return (await this.useRepository).find();
        } catch (error) {
            console.error('Error in getAllPersonas:', error);
            throw error;
        }
    }

    /**
     * Obtener una persona por su ID.
     * @param id - ID de la persona a buscar.
     * @returns Persona correspondiente al ID proporcionado o null si no se encuentra.
     * @throws {EntityNotFoundError} Si no se encuentra la persona.
     */
    async getPersonaById(id: number): Promise<PersonaEntity | null> {
        try {
            console.log(`${PersonaService.name} - getPersonaById`);
            const persona = await (await this.useRepository).findOne({
                where: { id },
                relations: ['reserva'],
            });

            if (!persona) {
                throw new EntityNotFoundError(PersonaEntity, id);
            }

            return persona;
        } catch (error) {
            console.error('Error in getPersonaById:', error);
            throw error;
        }
    }

    /**
     * Crear una nueva persona.
     * @param persona - Datos de la nueva persona.
     * @returns Persona recién creada o null si hay un error.
     */
    async createPersona(persona: ICreatePersonaDTO): Promise<PersonaEntity | null> {
        try {
            console.log(`${PersonaService.name} - createPersona`);
            return (await this.useRepository).save(persona);
        } catch (error) {
            console.error('Error in createPersona:', error);
            throw error;
        }
    }

    /**
     * Actualizar una persona por su ID.
     * @param id - ID de la persona a actualizar.
     * @param personaBody - Nuevos datos de la persona.
     * @returns Resultado de la actualización o null si hay un error.
     * @throws {EntityNotFoundError} Si no se encuentra la persona.
     */
    async updatePersona(id: number, personaBody: ICreatePersonaDTO): Promise<UpdateResult | null> {
        try {
            const result = await (await this.useRepository).update(id, personaBody);

            if (result && result.affected) {
                return result;
            } else {
                throw new EntityNotFoundError(PersonaEntity, id);
            }
        } catch (error) {
            console.error('Error in updatePersona:', error);
            throw error;
        }
    }

    /**
     * Eliminar una persona por su ID.
     * @param id - ID de la persona a eliminar.
     * @returns Resultado de la eliminación o null si hay un error.
     * @throws {EntityNotFoundError} Si no se encuentra la persona.
     */
    async deletePersonaById(id: number): Promise<DeleteResult | null> {
        try {
            const result = await (await this.useRepository).delete(id);

            if (result && result.affected) {
                return result;
            } else {
                throw new EntityNotFoundError(PersonaEntity, id);
            }
        } catch (error) {
            console.error('Error in deletePersonaById:', error);
            throw error;
        }
    }
}
