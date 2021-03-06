import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sessions')
export default class Session extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    token: string;

    static async createNew(userId: number, token: string) {
        const session = this.create({ userId, token });
        await session.save();
        return session;
    }

    static async removeSession(userId: number) {
        const session = this.createQueryBuilder()
            .delete()
            .from(this)
            .where('userId = :userId', { userId })
            .execute();
        return session;
    }
}
