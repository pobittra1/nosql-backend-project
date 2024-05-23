import { TProduct } from './product.interface';
import Product from './product.model';

//this function for create a product in db
const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

//this function for get all products from db
const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

//this function for get single product from db by _id
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  //we can get data also using aggregate, $match
  //const result = await Product.aggregate([{ $match: { _id: id } }]);
  return result;
};

//this function for delete product from db by _id
const deleteSingleProductFromDB = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

//this function for quering product from db by name value
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
