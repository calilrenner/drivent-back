import { Router } from 'express';

import * as controller from '@/controllers/client/hotels';

const router = Router();

router.get('/', controller.getHotels);

export default router;
