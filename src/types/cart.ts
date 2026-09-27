export interface CartItem {
    productId: string
    quantity: number
}

export interface Cart {
    id: string
    userId: string | null
    items: CartItem[]
    date: string
    status: string
}

// The "enriched" shape our join logic produces for the UI —
// keeps the raw API shape separate from what components actually render
export interface EnrichedCartItem extends CartItem {
    product: Product | null
}

export interface EnrichedCart extends Omit<Cart, 'items'> {
    user: User | null
    items: EnrichedCartItem[]
    itemCount: number
}