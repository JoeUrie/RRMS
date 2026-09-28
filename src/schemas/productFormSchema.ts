import { z } from 'zod'

export const productFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    price: z.coerce.number().positive('Price must be greater than 0'),
    category: z.string().min(1, 'Category is required'),
    description: z.string().min(1, 'Description is required'),
    stock: z.coerce.number().int('Must be a whole number').min(0, 'Cannot be negative'),
    rate: z.coerce.number().min(0, 'Minimum is 0').max(5, 'Maximum is 5'),
    ratingCount: z.coerce.number().int('Must be a whole number').min(0, 'Cannot be negative'),
    image_url: z.url('Must be a valid URL'),
    sku: z.string().min(1, 'SKU is required'),
})

export type ProductFormValues = z.infer<typeof productFormSchema>
