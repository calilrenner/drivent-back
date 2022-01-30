/* eslint-disable no-console */
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

    @OneToMany(() => Event, (events) => events.day, { eager: true })
    events: Event[];

    static async getEventsByDayId(dayId: number) {
        const dayData = (await this.find({ where: { id: dayId } }))[0];
        const orderedDayData = dayData.events.sort((a, b) =>
            a.beginHour > b.beginHour ? 1 : -1,
        );
        return orderedDayData;
    }
}
