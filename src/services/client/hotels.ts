import Hotels from '@/entities/Hotel';
import Rooms from '@/entities/Room';
import Vacancies from '@/entities/Vacancy';
import VacancyUser from '@/entities/VacancyUser';

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

export async function getReservation(userId: number) {
    const vacancyId = await VacancyUser.getVacancyId(userId);
    const roomInfo = await Rooms.getRoomInfoByVacancyId(vacancyId);
    const hotelInfo = await Hotels.getHotelInfoByRoomId(roomInfo.roomId);

    const reservationInfo = {
        hotelUrlImage: hotelInfo.hotelUrlImage,
        hotelName: hotelInfo.hotelName,
        roomNumber: roomInfo.roomNumber,
        roomType: roomInfo.roomType,
        roomOcupation: roomInfo.roomOcupation,
    };

    return reservationInfo;
}
