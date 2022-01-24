import { ReservationInfo } from '@/interfaces/reservation';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
} from 'typeorm';
import Room from './Room';

@Entity('vacancies')
export default class Vacancy extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'is_available' })
    isAvailable: boolean;

    @ManyToOne(() => Room, (room) => room.vacancies)
    room: Room;

    static async getVacancies() {
        const vacancies = await this.find();
        return vacancies || null;
    }

    static async updateVacanciesState(reservationInfo: ReservationInfo) {
        const vacancy = await this.findOne({
            where: { id: reservationInfo.vacancyId },
        });

        if (reservationInfo.newVacancyId) {
            vacancy.isAvailable = true;

            const newVacancy = await this.findOne({
                where: { id: reservationInfo.newVacancyId },
            });
            newVacancy.isAvailable = false;
            newVacancy.save();
        } else if (!reservationInfo.newVacancyId) {
            vacancy.isAvailable = false;
        }

        vacancy.save();
    }
}
