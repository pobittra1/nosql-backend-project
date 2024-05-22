import { TOrder } from './order.interface';
import Order from './order.model';

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};

const searchOrdersByQueryFromDB = async (value: string) => {
  const result = await Order.find({
    email: { $regex: value, $options: 'i' },
  });
  return result;
};
export const orderService = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  searchOrdersByQueryFromDB,
};
