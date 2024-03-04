/**
 * Clase AppError para representar errores personalizados en la aplicación.
 */
export class AppError {
    /**
     * Mensaje de error.
     */
    public readonly message: string;

    /**
     * Código de estado HTTP asociado al error.
     */
    public readonly statusCode: number;

    /**
     * Constructor de la clase AppError.
     * @param message - Mensaje de error.
     * @param statusCode - Código de estado HTTP (predeterminado: 400).
     */
    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
