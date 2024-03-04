/**
 * Clase `ValidateMiddlewareDTO` que proporciona middleware para validar y sanitizar los datos del cuerpo de la solicitud.
 */
import { NextFunction, Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { sanitize } from 'class-sanitizer';
import { HttpResponse } from '../../../response/http.response';

/**
 * Clase que representa el middleware para validación y sanitización de DTO.
 */
export class ValidateMiddlewareDTO {
    /**
     * Constructor de la clase `ValidateMiddlewareDTO`.
     * @param httpResponse - Objeto de respuesta HTTP para manejar las respuestas.
     */
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) { }

    /**
     * Método `validator` que realiza la validación y sanitización de los datos del cuerpo de la solicitud.
     * @param req - Objeto de solicitud.
     * @param res - Objeto de respuesta.
     * @param next - Función para pasar al siguiente middleware en la cadena de solicitud.
     * @param type - Tipo de la clase DTO a validar y sanitizar.
     */
    validator(req: Request, res: Response, next: NextFunction, type: any) {
        const dtoObj = plainToClass(type, req.body);

        validate(dtoObj).then((err) => {
            if (err.length > 0) {
                const dtoErrors = err.map((error: ValidationError) => (Object as any).values(error.constraints)).join(', ');
                return this.httpResponse.BadRequest(res, dtoErrors);
            } else {
                sanitize(dtoObj);
                req.body = dtoObj;
                next();
            }
        });
    }
}
