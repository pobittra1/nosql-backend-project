import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();

//order routes here
router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);

export const orderRoutes = router;
