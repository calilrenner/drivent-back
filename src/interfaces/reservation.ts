interface ReservationInfo {
    userId: number;
    hotelId: number;
    vacancyId: number;
    newHotelId?: number;
    newVacancyId?: number;
}

interface ChangeReservationInfo {
    userId: number;
    old: {
        hotelId: number;
        vacancyId: number;
    };
    new: {
        hotelId: number;
        vacancyId: number;
    };
}

export { ReservationInfo, ChangeReservationInfo };
