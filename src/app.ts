import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { productRoutes } from './app/modules/product/product.route';

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1/products', productRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
