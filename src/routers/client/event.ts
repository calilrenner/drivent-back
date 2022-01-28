import { Router } from 'express';

import * as controller from '@/controllers/client/event';

const router = Router();

router.get('/', controller.get);
router.post('/schedule', controller.postUserEvent);

export default router;
