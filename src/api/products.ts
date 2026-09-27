import { apiGet } from './client'
import type { Product } from '../types/products'

export function getProducts(): Promise<Product[]> {
    return apiGet<Product[]>('/products')
}

export function getProduct(id: string): Promise<Product> {
    return apiGet<Product>(`/products/${id}`)
}