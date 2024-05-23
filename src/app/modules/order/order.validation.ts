import { z } from 'zod';

//zod validation for order
const orderZodSchema = z.object({
  email: z.string().trim(),
  productId: z.string().trim(),
  price: z.number(),
  quantity: z.number(),
});

export default orderZodSchema;
