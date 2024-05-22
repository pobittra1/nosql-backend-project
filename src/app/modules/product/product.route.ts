import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

router.post('/create-product', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getSingleProduct);
router.delete('/:productId', productController.deleteProduct);
// router.get('/', productController.searchProductByQuery);

export const productRoutes = router;
