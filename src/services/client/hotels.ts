import Hotels from '@/entities/Hotel';
import Rooms from '@/entities/Room';
import Vacancies from '@/entities/Vacancy';

import NotFoundError from '@/errors/NotFoundError';

export async function getHotels() {
    const hotels = await Hotels.getHotels();
    const rooms = await Rooms.getRooms();
    const vacancies = await Vacancies.getVacancies();

    if (hotels.length === 0 || rooms.length === 0 || vacancies.length === 0) {
        throw new NotFoundError();
    }

    return hotels;
}
