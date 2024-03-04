/**
 * Clase `HttpResponse` que proporciona métodos para enviar respuestas HTTP comunes.
 */
import { Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export class HttpResponse {
    /**
     * Método `OK` para enviar una respuesta HTTP 200 OK.
     * @param res - Objeto de respuesta de Express.
     * @param data - Datos a incluir en la respuesta.
     */
    OK(res: Response, data: any) {
        return res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            statusMessage: ReasonPhrases.OK,
            data,
        });
    }

    /**
     * Método `NotFound` para enviar una respuesta HTTP 404 Not Found.
     * @param res - Objeto de respuesta de Express.
     * @param data - Datos a incluir en la respuesta.
     */
    NotFound(res: Response, data: any) {
        return res.status(StatusCodes.NOT_FOUND).json({
            status: StatusCodes.NOT_FOUND,
            statusMessage: ReasonPhrases.NOT_FOUND,
            data,
        });
    }

    /**
     * Método `Unauthorized` para enviar una respuesta HTTP 401 Unauthorized.
     * @param res - Objeto de respuesta de Express.
     * @param data - Datos a incluir en la respuesta.
     */
    Unauthorized(res: Response, data: any) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            status: StatusCodes.UNAUTHORIZED,
            statusMessage: ReasonPhrases.UNAUTHORIZED,
            data,
        });
    }

    /**
     * Método `Forbidden` para enviar una respuesta HTTP 403 Forbidden.
     * @param res - Objeto de respuesta de Express.
     * @param data - Datos a incluir en la respuesta.
     */
    Forbidden(res: Response, data: any) {
        return res.status(StatusCodes.FORBIDDEN).json({
            status: StatusCodes.FORBIDDEN,
            statusMessage: ReasonPhrases.FORBIDDEN,
            data,
        });
    }

    /**
     * Método `BadRequest` para enviar una respuesta HTTP 400 Bad Request.
     * @param res - Objeto de respuesta de Express.
     * @param data - Datos a incluir en la respuesta.
     */
    BadRequest(res: Response, data: any): Response {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            statusMessage: 'BAD REQUEST',
            data,
        });
    }

    /**
     * Método `Error` para enviar una respuesta HTTP 500 Internal Server Error.
     * @param res - Objeto de respuesta de Express.
     * @param data - Datos a incluir en la respuesta.
     */
    Error(res: Response, data: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            statusMessage: ReasonPhrases.INTERNAL_SERVER_ERROR,
            data,
        });
    }
}
