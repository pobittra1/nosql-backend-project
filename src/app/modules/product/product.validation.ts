import { z } from 'zod';

//zod schema for variants
const variantsZodSchema = z.object({
  type: z.string().trim(),
  value: z.string().trim(),
});
//zod schema for inventory
const inventoryZodSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

//zod schema for product
const productZodSchema = z.object({
  name: z.string().trim(),
  description: z.string().trim(),
  price: z.number(),
  category: z.string().trim(),
  tags: z.array(z.string()),
  variants: z.array(variantsZodSchema),
  inventory: inventoryZodSchema,
});

export default productZodSchema;
