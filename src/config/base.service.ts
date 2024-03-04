import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { ConfigServer } from './config';

// Clase base para servicios que interactúan con la base de datos usando TypeORM
export class BaseService<T extends ObjectLiteral> extends ConfigServer {
  // Propiedad que representa la promesa de un repositorio de TypeORM
  public useRepository: Promise<Repository<T>>;

  // Constructor que recibe el tipo de entidad que gestionará el servicio
  constructor(private getEntity: EntityTarget<T>) {
    // Llama al constructor de la clase padre (ConfigServer)
    super();

    // Inicializa la propiedad 'useRepository' llamando a la función 'initRepository'
    this.useRepository = this.initRepository(getEntity);
  }

  // Inicializa y devuelve un repositorio de TypeORM para la entidad dada
  async initRepository<T extends ObjectLiteral>(entity: EntityTarget<T>) {
    // Espera a que se inicie la conexión a la base de datos (promesa)
    const connection = await this.initConnect;

    // Devuelve el repositorio de TypeORM para la entidad dada
    return connection.getRepository(entity);
  }
}
