import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

/**
 * DTO (Data Transfer Object) para la creación de una persona.
 */
export class ICreatePersonaDTO {
    @IsOptional()
    idPersona?: number; // Campo opcional para el ID de la persona.

    @IsNotEmpty()
    nombreCompleto!: string; // Nombre completo de la persona, es obligatorio.

    @IsNotEmpty()
    nroDocumento!: string; // Número de documento de la persona, es obligatorio.

    @IsNotEmpty()
    correo!: string; // Dirección de correo electrónico de la persona, es obligatorio.

    @IsNotEmpty()
    telefono!: string; // Número de teléfono de la persona, es obligatorio.
}
