import { Request, Response } from 'express';
import { productService } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const result = await productService.createProductIntoDB(productData);
    res.status(200).json({
      success: true,
      message: 'get the data',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: ' invalid data',
      error: err,
    });
  }
};

export const productController = {
  createProduct,
};
