import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    BaseEntity,
    JoinColumn,
} from 'typeorm';

import { ReservationInfo } from '@/interfaces/reservation';
import Vacancy from './Vacancy';
import User from './User';

@Entity('vacancies_users')
export default class VacancyUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Vacancy, { eager: true })
    @JoinColumn()
    vacancy: Vacancy;

    @OneToOne(() => User, { eager: true })
    @JoinColumn()
    user: User;

    static async getVacancyUser() {
        const vacanciesPerUser = await this.find();
        return vacanciesPerUser || null;
    }

    static async createOrUpdateVacancyUser(reservationInfo: ReservationInfo) {
        const { userId, vacancyId } = reservationInfo;

        const body = {
            user: { id: userId },
            vacancy: { id: vacancyId },
        };

        let reservation = await this.findOne({
            where: { user: { id: userId } },
        });

        if (reservation !== undefined) {
            reservation.vacancy.id = reservationInfo.newVacancyId;
        } else {
            reservation = VacancyUser.create(body);
        }

        await reservation.save();
    }

    static async getVacancyId(userId: number) {
        const reservation = await this.findOne({
            where: { user: { id: userId } },
        });

        const vacancyId = reservation.vacancy.id;
        return vacancyId;
    }
}
