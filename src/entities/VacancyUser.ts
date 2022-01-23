import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    BaseEntity,
    JoinColumn,
} from 'typeorm';

import Vacancy from './Vacancy';
import User from './User';

@Entity('vacancies_users')
export default class VacancyUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Vacancy)
    @JoinColumn()
    vacancy: Vacancy;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    static async getVacancyUser() {
        const vacanciesPerUser = await this.find();
        return vacanciesPerUser || null;
    }
}
