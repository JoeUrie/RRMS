import { useState } from 'react'
import { useEnrichedCarts } from '../hooks/useEnrichedCarts'
import CartTable from '../components/carts/CartTable'
import CartCard from '../components/carts/CartCard'
import CartDetailModal from '../components/carts/CartDetailModal'
import Spinner from '../components/ui/Spinner'
import ErrorState from '../components/ui/ErrorState'
import EmptyState from '../components/ui/EmptyState'
import type { EnrichedCart } from '../types/cart'

function Carts() {
    const { data: carts, isLoading, error } = useEnrichedCarts()
    const [selectedCart, setSelectedCart] = useState<EnrichedCart | null>(null)

    return (
        <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Carts</h2>

            {isLoading && <Spinner label="Loading carts..." />}

            {error !== undefined && error !== null && !isLoading && (
                <ErrorState message={String(error)} />
            )}

            {!isLoading && !error && carts.length === 0 && (
                <EmptyState message="No carts found." />
            )}

            {!isLoading && !error && carts.length > 0 && (
                <>
                <CartTable carts={carts} onSelect={setSelectedCart} />
                <div className="space-y-3 md:hidden">
                    {carts.map((cart) => (
                    <CartCard key={cart.id} cart={cart} onSelect={setSelectedCart} />
                    ))}
                </div>
                </>
            )}

            <CartDetailModal cart={selectedCart} onClose={() => setSelectedCart(null)} />
        </div>
    )
}

export default Carts
