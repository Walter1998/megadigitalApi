import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { AppDataSource } from './data.source';

// Clase abstracta para la configuración del servidor
export abstract class ConfigServer {
  // Propiedad que devuelve una promesa para inicializar la conexión a la base de datos
  get initConnect(): Promise<DataSource> {
    // Llama al método estático 'initialize' de la clase 'AppDataSource'
    return AppDataSource.initialize();
  }
}
