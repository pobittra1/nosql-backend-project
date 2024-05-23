import { orderService } from './order.service';
import { Request, Response } from 'express';
import orderZodSchema from './order.validation';
import Product from '../product/product.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const zodParseData = orderZodSchema.parse(orderData);
    const result = await orderService.createOrderIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });

    //destructuring
    const { _id, quantity } = result; //this result is order object
    const product = await Product.findById(_id);
    if (product) {
      product.inventory.quantity--;
      if (product.inventory.quantity < quantity) {
        product.inventory.inStock = false;
        //Insufficient Quantity Error
        res.status(500).json({
          success: false,
          message: 'Insufficient quantity available in inventory',
        });
      } else if (product.inventory.quantity > quantity) {
        product.inventory.inStock = true;
      }
    } else if (!product) {
      //order Not Found Error
      res.status(500).json({
        success: false,
        message: 'Order not found',
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

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const value = req.query.email;
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
