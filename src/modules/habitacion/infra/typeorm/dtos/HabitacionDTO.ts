import { IsBoolean, IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

// Clase que define la estructura de los datos para la creación o actualización de habitaciones
export class HabitacionDTO {
    @IsInt({ message: 'El número de piso debe ser un número entero' })
    @Min(1, { message: 'El número de piso debe ser mayor a 0' })
    @Max(10, { message: 'El número de piso debe ser menor o igual a 10' })
    habitacionpiso!: number; // Número de piso de la habitación, debe ser un entero entre 1 y 10.

    @IsInt({ message: 'El número de habitación debe ser un número entero' })
    @Min(1, { message: 'El número de habitación debe ser mayor a 0' })
    @Max(20, { message: 'El número de habitación debe ser menor o igual a 20' })
    habitacionnro!: number; // Número de la habitación, debe ser un entero entre 1 y 20.

    @IsInt({ message: 'La cantidad de camas debe ser un número entero' })
    @Min(1, { message: 'La cantidad de camas debe ser mayor o igual a 1' })
    @Max(4, { message: 'La cantidad de camas debe ser menor o igual a 4' })
    cantcamas!: number; // Cantidad de camas en la habitación, debe ser un entero entre 1 y 4.

    @IsBoolean({ message: 'El campo tienetelevision debe ser un valor booleano' })
    @IsOptional()  // Campo opcional, puede no ser proporcionado en la solicitud
    tienetelevision?: boolean; // Indica si la habitación tiene televisión.

    @IsBoolean({ message: 'El campo tienefrigobar debe ser un valor booleano' })
    @IsOptional()  // Campo opcional, puede no ser proporcionado en la solicitud
    tienefrigobar?: boolean; // Indica si la habitación tiene frigobar.
}
