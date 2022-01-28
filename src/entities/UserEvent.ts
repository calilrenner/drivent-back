import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';
import Event from './Event';
import { EventsByUser } from '@/interfaces/event';

@Entity('user_events')
export default class UserEvent extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    eventId: number;

    @ManyToOne(() => User, (user) => user.usersEvent)
    user: User;

    @ManyToOne(() => Event, (event) => event.userEvents, { eager: true })
    event: Event;

    static async findUserEvent(userId: number) {
        const eventi = await this.find({ where: { userId } });

        return eventi;
    }

    static async createUserEvent(userEvent: EventsByUser) {
        const newUserEvent = this.create(userEvent);
        await newUserEvent.save();

        return newUserEvent;
    }
}
