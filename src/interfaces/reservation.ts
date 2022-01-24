interface ReservationInfo {
    userId: number;
    hotelId: number;
    vacancyId: number;
    newHotelId?: number;
    newVacancyId?: number;
}

export { ReservationInfo };
