import { useQuery } from '@tanstack/react-query'
import { getCarts } from '../api/carts'
import { getUsers } from '../api/users'
import { getProducts } from '../api/products'
import type { EnrichedCart } from '../types/cart'

// Normalize every ID to a string at the boundary — this is the fix for the
// user.id (string) vs cart.userId (number) mismatch we found in the raw API.
const toId = (value: string | number | null | undefined): string | null =>
    value === null || value === undefined ? null : String(value)

export function useEnrichedCarts() {
    const cartsQuery = useQuery({ queryKey: ['carts'], queryFn: getCarts })
    const usersQuery = useQuery({ queryKey: ['users'], queryFn: getUsers })
    const productsQuery = useQuery({ queryKey: ['products'], queryFn: getProducts })

    const isLoading =
        cartsQuery.isLoading || usersQuery.isLoading || productsQuery.isLoading
    const error = cartsQuery.error || usersQuery.error || productsQuery.error

    let data: EnrichedCart[] = []

    if (cartsQuery.data && usersQuery.data && productsQuery.data) {
        const userMap = new Map(usersQuery.data.map((u) => [toId(u.id), u]))
        const productMap = new Map(productsQuery.data.map((p) => [toId(p.id), p]))

        data = cartsQuery.data.map((cart) => {
            const userId = toId(cart.userId)
            const user = userId ? userMap.get(userId) ?? null : null

            const items = cart.items.map((item) => {
                const productId = toId(item.productId)
                const product = productId ? productMap.get(productId) ?? null : null
                return { ...item, product }
            })

            return {
                ...cart,
                user,
                items,
                itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
            }
        })
    }

    return { data, isLoading, error }
}