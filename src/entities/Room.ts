import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import Hotel from './Hotel';
import Vacancy from './Vacancy';

@Entity('rooms')
export default class Room extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: number;

    @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
    hotel: Hotel;

    @OneToMany(() => Vacancy, (vacancy) => vacancy.room, { eager: true })
    vacancies: Vacancy[];

    static async getRooms() {
        const rooms = await this.find();
        return rooms || null;
    }
}
