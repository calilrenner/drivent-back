import { Router } from 'express';

import eventRouter from '@/routers/client/event';
import userRouter from '@/routers/client/user';
import authRouter from '@/routers/client/auth';
import enrollmentRouter from '@/routers/client/enrollment';
import paymentRouter from '@/routers/client/payment';
import hotelsRouter from '@/routers/client/hotels';
import roomsRouter from '@/routers/client/rooms';

import tokenValidationMiddleware from '@/middlewares/tokenValidationMiddleware';

const router = Router();

router.use('/event', eventRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/payment', paymentRouter);
router.use('/enrollments', tokenValidationMiddleware, enrollmentRouter);
router.use('/hotels', hotelsRouter);
router.use('/rooms', roomsRouter);

export default router;
