import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { productRoutes } from './app/modules/product/product.route';
import { orderRoutes } from './app/modules/order/order.route';

//parsers
app.use(express.json());
app.use(cors());

//application routes
//route of product
app.use('/api/products', productRoutes);
//route of order
app.use('/api/orders', orderRoutes);

//sample error response for not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
