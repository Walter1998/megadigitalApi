/**
 * Archivo de entrada principal para iniciar la aplicación.
 */
import App from './app';
import { BaseRouter } from '../shared/router/base.router';
import BaseRoute from '../routes/base.routes';
import PersonaRoute from '../shared/infra/http/routes/persona.routes';
import 'reflect-metadata';
import HabitacionRoute from '../shared/infra/http/routes/habitacion.routes';
import ReservaRoute from '../shared/infra/http/routes/reserva.routes';

// Crear una instancia de la aplicación con las rutas especificadas
const app = new App([
    new BaseRoute(),
    new PersonaRoute(),
    new HabitacionRoute(),
    new ReservaRoute()
]);

// Iniciar la escucha del servidor
const portNumber = 3000;
const hostAddress = '0.0.0.0';

app.listen(portNumber, hostAddress);
