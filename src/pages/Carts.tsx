import { useState } from 'react'
import { useEnrichedCarts } from '../hooks/useEnrichedCarts'
import CartTable from '../components/carts/CartTable'
import CartCard from '../components/carts/CartCard'
import CartDetailModal from '../components/carts/CartDetailModal'
import type { EnrichedCart } from '../types/cart'

function Carts() {
    const { data: carts, isLoading, error } = useEnrichedCarts()
    const [selectedCart, setSelectedCart] = useState<EnrichedCart | null>(null)

    if (isLoading) return <p>Loading carts...</p>
    if (error) return <p className="text-red-600">Failed to load carts: {String(error)}</p>

    if (carts.length === 0) {
        return <p className="text-gray-500">No carts found.</p>
    }

    return (
        <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Carts</h2>

            <CartTable carts={carts} onSelect={setSelectedCart} />

            <div className="space-y-3 md:hidden">
                {carts.map((cart) => (
                <CartCard key={cart.id} cart={cart} onSelect={setSelectedCart} />
                ))}
            </div>

            <CartDetailModal cart={selectedCart} onClose={() => setSelectedCart(null)} />
        </div>
    )
}

export default Carts
