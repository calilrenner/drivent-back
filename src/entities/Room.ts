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

    static async getRoomInfoByVacancyId(vacancyId: number) {
        const rooms = await this.find();
        const roomInfo = {
            roomId: 0,
            roomNumber: 0,
            roomType: 0,
            roomOcupation: 0,
        };

        rooms.forEach((room) => {
            room.vacancies.forEach((vacancy) => {
                if (vacancy.id === vacancyId) {
                    roomInfo.roomId = room.id;
                    roomInfo.roomNumber = room.number;
                }
            });
        });

        const room = await this.findOne({ where: { id: roomInfo.roomId } });
        roomInfo.roomType = room.vacancies.length;
        room.vacancies.forEach((vacancy) => {
            if (vacancy.isAvailable === false) roomInfo.roomOcupation++;
        });

        return roomInfo;
    }
}
