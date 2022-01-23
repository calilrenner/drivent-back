import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
} from 'typeorm';
import Room from './Room';

@Entity('hotels')
export default class Hotel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ name: 'accommodation_type' })
    accommodationType: string;

    @Column({ name: 'image_url' })
    imageUrl: string;

    @Column()
    vacancies: number;

    @OneToMany(() => Room, (room) => room.hotel, { eager: true })
    rooms: Room[];

    static async getHotels() {
        const hotels = await this.find();
        return hotels || null;
    }
}
