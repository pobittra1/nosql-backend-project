import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: [true, 'you should provide email of order'],
    trim: true,
  },
  productId: {
    type: String,
    required: [true, 'you should provide productId of order'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'you should provide price of order'],
  },
  quantity: {
    type: Number,
    required: [true, 'you should provide price of order'],
  },
});

//create model
const Order = model('Order', orderSchema);

export default Order;
