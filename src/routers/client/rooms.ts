import { Router } from 'express';

import * as controller from '@/controllers/client/rooms';

const router = Router();

router.post('/', controller.postReservation);

export default router;
