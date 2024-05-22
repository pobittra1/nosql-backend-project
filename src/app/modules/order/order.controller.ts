import { orderService } from './order.service';
import { Request, Response } from 'express';
import orderZodSchema from './order.validation';

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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'order post failed',
      error: err,
    });
  }
};

export const orderController = {
  createOrder,
};
