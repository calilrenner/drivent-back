import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import Ticket from './Ticket';

@Entity('acommodations')
export default class Acommodation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    value: number;

    @OneToMany(() => Ticket, (ticket) => ticket.acommodation)
    tickets: Ticket[];

    static async findAcommodationId(type: string) {
        const acommodation = await this.findOne({ where: { type } });

        return acommodation.id;
    }
}
