import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReservaEntity } from '../../../../reserva/infra/typeorm/entities/reserva.entity';

// Entidad que representa la tabla "habitacion" en la base de datos
@Entity("habitacion")
export class HabitacionEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'int' })
    habitacionpiso!: number;  // Número de piso de la habitación

    @Column({ type: 'int' })
    habitacionnro!: number;   // Número de habitación

    @Column({ type: 'int', default: 1 })
    cantcamas!: number;       // Cantidad de camas en la habitación, con valor predeterminado de 1

    @Column({ type: 'boolean', default: true })
    tienetelevision!: boolean;  // Indica si la habitación tiene televisión, con valor predeterminado verdadero

    @Column({ type: 'boolean', default: true })
    tienefrigobar!: boolean;    // Indica si la habitación tiene frigobar, con valor predeterminado verdadero

    @OneToMany(() => ReservaEntity, reserva => reserva.habitacion)
    reserva!: ReservaEntity[];   // Relación uno a muchos con la entidad ReservaEntity, representando las reservas asociadas a esta habitación
}
