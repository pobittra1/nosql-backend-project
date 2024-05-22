import { Schema, model } from 'mongoose';

import { TInventory, TProduct, TVariants } from './product.interface';

const variantsSchema = new Schema<TVariants>({
  type: {
    type: String,
    required: [true, 'you should provide type of varints'],
    trim: true,
  },
  value: {
    type: String,
    required: [true, 'you should provide value of varints'],
    trim: true,
  },
});

const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: [true, 'you should provide quantity of inventory'],
    trim: true,
  },
  inStock: {
    type: Boolean,
    required: [true, 'you should provide inStock state of inventory'],
    trim: true,
  },
});

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, 'you should provide name of product'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'you should provide value of product'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'you should provide price of product'],
  },
  category: {
    type: String,
    required: [true, 'you should provide category of product'],
    trim: true,
  },
  tags: {
    type: [String],
    required: [true, 'you should provide tags of product'],
  },
  variants: {
    type: [variantsSchema],
    required: [true, 'you should provide variants of product'],
  },
  inventory: {
    type: inventorySchema,
    required: [true, 'you should provide inventory of product'],
  },
});

//create model
const Product = model('Product', productSchema);

export default Product;
