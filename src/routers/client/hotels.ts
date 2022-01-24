import { Router } from 'express';

import * as controller from '@/controllers/client/hotels';

const router = Router();

router.get('/', controller.getHotels);
router.get('/:id', controller.getReservation);

export default router;
