import Hotels from '@/entities/Hotel';
import Vacancies from '@/entities/Vacancy';
import VacancyUser from '@/entities/VacancyUser';
import { ReservationInfo } from '@/interfaces/reservation';

import NotFoundError from '@/errors/NotFoundError';

export async function postVacancyReservation(reservation: ReservationInfo) {
    await VacancyUser.createOrUpdateVacancyUser(reservation);
    await Hotels.updateVacanciesNumber(reservation);
}
