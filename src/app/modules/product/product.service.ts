import { TProduct } from './product.interface';
import Product from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  //we can get data also using aggregate, $match
  //const result = await Product.aggregate([{ $match: { _id: id } }]);
  return result;
};

const deleteSingleProductFromDB = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

const searchProductByQueryFromDB = async (value: string) => {
  const result = await Product.find({
    name: { $regex: value, $options: 'i' },
  });
  return result;
};

export const productService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteSingleProductFromDB,
  searchProductByQueryFromDB,
};
