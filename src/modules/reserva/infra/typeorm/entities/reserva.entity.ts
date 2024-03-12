import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PersonaEntity } from '../../../../persona/infra/typeorm/entities/Persona.entity';
import { HabitacionEntity } from '../../../../habitacion/infra/typeorm/entities/Habitacion.entity';

/**
 * Entidad que representa una reserva en la base de datos.
 */
@Entity('reserva')
export class ReservaEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechareserva?: Date;

    @Column({ type: 'timestamp' })
    fechaentrada!: Date;

    @Column({ type: 'timestamp' })
    fechasalida?: Date;

    @Column({ type: 'int' })
    montoreserva!: number;

    @Column({ type: 'int', name: 'persona_id' })
    persona_id!: number;

    @Column({ type: 'int', name: 'habitacion_id' })
    habitacion_id!: number;

    @ManyToOne(() => PersonaEntity, (persona) => persona.reserva)
    @JoinColumn({ name: "persona_id" })
    persona!: PersonaEntity;

    @ManyToOne(() => HabitacionEntity, (habitacion) => habitacion.reserva)
    @JoinColumn({ name: "habitacion_id" })
    habitacion!: HabitacionEntity;
}
