export interface Rating {
    rate: number
    count: number
}

export interface Product {
    id: string
    name: string
    description: string
    price: number
    category: string
    stock: number
    sku: string
    image_url: string
    rating: Rating
}