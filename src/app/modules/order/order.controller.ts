import { orderService } from './order.service';
import { Request, Response } from 'express';
import orderZodSchema from './order.validation';
import Product from '../product/product.model';

//this function for create order into db
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const { productId, quantity } = orderData;
    const product = await Product.findById(productId);

    //Not Found Error
    if (!product?._id) {
      return res.status(500).json({
        success: false,
        message: 'Order not found',
      });
    }

    //Insufficient Quantity Error
    if (product.inventory.quantity < quantity) {
      return res.status(500).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }

    //zod validate data
    const zodParseData = orderZodSchema.parse(orderData);
    const result = await orderService.createOrderIntoDB(zodParseData);
    if (result) {
      //reduce quantity when create data
      product.inventory.quantity = product.inventory.quantity - quantity;
      if (product.inventory.quantity === 0) {
        product.inventory.inStock = false;
      } else {
        product.inventory.inStock = true;
      }
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'order post failed',
      error: err,
    });
  }
};

//this function for get all orders from db
const getAllOrders = async (req: Request, res: Response) => {
  try {
    //quering by email
    const value = req.query.email;
    //here if, else if for generate different type message and data
    if (value) {
      const resultQuery = await orderService.searchOrdersByQueryFromDB(
        value as string,
      );
      res.status(200).json({
        success: true,
        message: `Orders fetched successfully for user email!`,
        data: resultQuery,
      });
    } else {
      const result = await orderService.getAllOrdersFromDB();
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "can'nt fatched data",
      error: err,
    });
  }
};

export const orderController = {
  createOrder,
  getAllOrders,
};
