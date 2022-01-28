import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import Day from './Day';
import Trail from './Trail';
import UserEvent from './UserEvent';

@Entity('events')
export default class Event extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    trailId: number;

    @Column()
    beginHour: number;

    @Column()
    finalHour: number;

    @Column()
    dayId: number;

    @Column()
    vacancies: number;

    @OneToMany(() => UserEvent, (userEvents) => userEvents.event)
    userEvents: UserEvent[];

    @ManyToOne(() => Day, (day) => day.events)
    day: Day;

    @ManyToOne(() => Trail, (trail) => trail.events)
    trail: Trail;

    static async findEvent(eventId: number) {
        return this.findOne({ where: { id: eventId } });
    }
}
