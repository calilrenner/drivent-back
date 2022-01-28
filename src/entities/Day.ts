import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import Event from './Event';

@Entity('days')
export default class Day extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    day: string;

    @OneToMany(() => Event, (events) => events.day)
    events: Event;
}
