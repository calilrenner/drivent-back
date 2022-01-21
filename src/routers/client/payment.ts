import { Router } from 'express';

import * as controller from '@/controllers/client/payment';

const router = Router();

router.post('/', controller.saveTicket);
router.get('/:id', controller.findTicket);

export default router;
