import { IsNotEmpty, IsNumber, IsPositive, IsDate, IsISO8601 } from 'class-validator';

/**
 * Clase que define la estructura de los datos para la creación o actualización de reservas.
 */
export class ReservaDTO {
    id?: number;

    @IsNotEmpty({ message: 'La fecha de reserva es obligatoria' })
    fechareserva!: Date;

    @IsNotEmpty({ message: 'La fecha de entrada es obligatoria' })
    fechaentrada!: Date;

    @IsNotEmpty({ message: 'La fecha de salida es obligatoria' })
    fechasalida!: Date;

    @IsNotEmpty({ message: 'La habitación ID es obligatoria' })
    @IsNumber({}, { message: 'La habitación ID debe ser un número' })
    @IsPositive({ message: 'La habitación ID debe ser un número positivo' })
    habitacion_id!: number;

    @IsNotEmpty({ message: 'La persona ID es obligatoria' })
    @IsNumber({}, { message: 'La persona ID debe ser un número' })
    @IsPositive({ message: 'La persona ID debe ser un número positivo' })
    persona_id!: number;

    montoreserva?: number;
}
