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
      message: 'product post failed',
      error: err,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productService.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "can'nt fatched data",
      error: err,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productService.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "single product can'nt get",
      error: err,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productService.deleteSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      //data: result.acknowledged && null, //also we can use this
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "product data isn't delete",
      error: err,
    });
  }
};

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
};
