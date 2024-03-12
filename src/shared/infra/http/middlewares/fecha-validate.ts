/**
 * Compara si una fecha es mayor que el día actual.
 * @param {Date} fecha La fecha a comparar.
 * @returns {boolean} True si la fecha es mayor que el día actual, false de lo contrario.
 */
export function esFechaMayorQueHoy(fecha: Date): boolean {
    // Obtener la fecha actual
    const hoy: Date = new Date();

    // Comparar las fechas (ignorando la hora)
    hoy.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 del día actual
    fecha.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 de la fecha proporcionada

    // Devolver true si la fecha proporcionada es mayor que el día actual, de lo contrario, devolver false
    return fecha.getTime() > hoy.getTime();
}

/**
 * Compara si la fecha de salida es mayor que la fecha de entrada.
 * @param {Date} fechaEntrada La fecha de entrada.
 * @param {Date} fechaSalida La fecha de salida.
 * @returns {boolean} True si la fecha de salida es mayor que la fecha de entrada, false de lo contrario.
 */
export function esFechaSalidaMayor(fechaEntrada: Date, fechaSalida: Date): boolean {
    // Comparar las fechas (ignorando la hora)
    fechaEntrada.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 de la fecha de entrada
    fechaSalida.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 de la fecha de salida

    // Devolver true si la fecha de salida es mayor que la fecha de entrada, de lo contrario, devolver false
    return fechaSalida.getTime() > fechaEntrada.getTime();
}

