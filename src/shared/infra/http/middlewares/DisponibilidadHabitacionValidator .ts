/**
 * Validador de restricción personalizado para verificar la disponibilidad de una habitación en una fecha determinada.
 */
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { getRepository } from 'typeorm';
import { ReservaEntity } from '../../../../modules/reserva/infra/typeorm/entities/reserva.entity';

/**
 * Interfaz que representa los datos de una reserva.
 */
interface ReservaDTO {
    habitacionid: number;
}

/**
 * Clase `DisponibilidadHabitacionValidator` que implementa la interfaz `ValidatorConstraintInterface`.
 */
@ValidatorConstraint({ name: 'disponibilidadHabitacion', async: true })
export class DisponibilidadHabitacionValidator implements ValidatorConstraintInterface {
    /**
     * Método para validar la disponibilidad de una habitación en una fecha específica.
     * @param value - Valor a validar (fecha de salida).
     * @param args - Argumentos de validación (incluido el objeto que contiene habitacionid).
     * @returns `true` si la habitación está disponible en la fecha de salida, de lo contrario, `false`.
     */
    async validate(value: any, args: ValidationArguments) {
        const [fechaSalida, habitacionId] = [value, (args.object as ReservaDTO).habitacionid];

        // Lógica para verificar la disponibilidad de la habitación en la fecha de salida
        const reservaRepository = getRepository(ReservaEntity);
        const reservasEnFecha = await reservaRepository.find({
            where: {
                habitacion: { id: habitacionId },
                fechasalida: fechaSalida
            }
        });

        return reservasEnFecha.length === 0;
    }

    /**
     * Mensaje predeterminado que se devuelve si la validación falla.
     * @param args - Argumentos de validación (incluido el objeto que contiene habitacionid).
     * @returns Mensaje indicando que la habitación no está disponible en el rango de fechas deseado.
     */
    defaultMessage(args: ValidationArguments) {
        const habitacionId = (args.object as ReservaDTO).habitacionid;
        return `La habitación con ID ${habitacionId} no está disponible en el rango de fechas deseado`;
    }
}
