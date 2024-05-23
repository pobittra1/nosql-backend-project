import { TOrder } from './order.interface';
import Order from './order.model';

//this function for create order into db
const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);
  return result;
};

//this function for get all orders from db
const getAllOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};

//this function for quering by email. here value is email property
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
