import { Router } from 'express';

import * as controller from '@/controllers/client/event';

const router = Router();

router.get('/', controller.get);
router.post('/schedule', controller.postUserEvent);
router.post('/schedule/update', controller.updateUserEvent);
router.get('/:id/:userId', controller.getEventsByDayId);

export default router;
