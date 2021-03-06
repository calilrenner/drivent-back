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

    static async createUserEvent(userEvent: EventsByUser) {
        const newUserEvent = this.create(userEvent);
        await newUserEvent.save();

        return newUserEvent;
    }

    static async updateEvent(userId: number, eventId: number) {
        const deleteEvent = await this.delete({ userId, eventId });
    }

    static async findEventsByUserId(userId: number) {
        const events = await this.find({ where: { userId } });

        return events;
    }

    static async findEventsByEventId(eventId: number) {
        const event = this.findAndCount({ where: { eventId } });

        return event;
    }
}
