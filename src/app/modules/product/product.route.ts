import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

//routes of product
router.post('/create-product', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getSingleProduct);
router.delete('/:productId', productController.deleteProduct);

export const productRoutes = router;
