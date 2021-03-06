import TicketInfo from '@/interfaces/ticket';
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import Acommodation from './Acommodation';
import Modality from './Modality';

@Entity('users_tickets')
export default class Ticket extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    acommodationId: number;

    @Column()
    modalityId: number;

    @ManyToOne(() => Acommodation, (acommodation) => acommodation.tickets, {
        eager: true,
    })
    acommodation: Acommodation;

    @ManyToOne(() => Modality, (modality) => modality.tickets, { eager: true })
    modality: Modality;

    static async findTicket({
        ticket,
        id,
    }: {
        ticket?: TicketInfo;
        id?: number;
    }) {
        const userId = ticket?.userId;

        const createdTicket = await this.find({
            where: { userId: userId || id },
        });

        return createdTicket || null;
    }

    static async populateTicket(ticket: TicketInfo) {
        const { userId, acommodation, modality } = ticket;

        const acommodationId = await Acommodation.findAcommodationId(
            acommodation,
        );
        const modalityId = await Modality.findModalityId(modality);

        const newTicket = this.create({ userId, modalityId, acommodationId });

        await newTicket.save();
        return newTicket;
    }
}
