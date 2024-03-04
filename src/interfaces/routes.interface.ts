import { Router } from 'express';

// Interfaz para definir las rutas de Express
export interface Routes {
    path?: string;   // Opcional: Ruta base para el conjunto de rutas
    router: Router;  // Objeto Router de Express asociado a las rutas
}
