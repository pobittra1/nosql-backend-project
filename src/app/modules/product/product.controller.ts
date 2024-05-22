import { Request, Response } from 'express';
import { productService } from './product.service';
import productZodSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParseData = productZodSchema.parse(productData);
    const result = await productService.createProductIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
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
