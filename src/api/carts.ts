import { apiGet } from './client'
import type { Cart } from '../types/cart'

export function getCarts(): Promise<Cart[]> {
    return apiGet<Cart[]>('/carts')
}