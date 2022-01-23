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
}
