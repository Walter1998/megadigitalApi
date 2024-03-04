import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReservaEntity } from '../../../../reserva/infra/typeorm/entities/reserva.entity';

@Entity("persona")
export class PersonaEntity {
    @PrimaryGeneratedColumn()
    id?: number; // Identificador único de la persona, generado automáticamente.

    @Column()
    nombreCompleto!: string; // Nombre completo de la persona.

    @Column()
    nroDocumento!: string; // Número de documento de la persona.

    @Column()
    correo!: string; // Dirección de correo electrónico de la persona.

    @Column()
    telefono!: string; // Número de teléfono de la persona.

    @OneToMany(() => ReservaEntity, reserva => reserva.persona)
    reserva!: ReservaEntity[]; // Relación uno a muchos con la entidad ReservaEntity, indica las reservas asociadas a la persona.
}
