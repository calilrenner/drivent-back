import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import Ticket from './Ticket';

@Entity('modalities')
export default class Modality extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    value: number;

    @OneToMany(() => Ticket, (ticket) => ticket.modality)
    tickets: Ticket[];

    static async findModalityId(type: string) {
        const modality = await this.findOne({ where: { type } });

        return modality.id;
    }
}
