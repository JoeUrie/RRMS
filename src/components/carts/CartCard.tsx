import type { EnrichedCart } from '../../types/cart'

interface CartCardProps {
  cart: EnrichedCart
  onSelect: (cart: EnrichedCart) => void
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function CartCard({ cart, onSelect }: CartCardProps) {
  const customerName = cart.user ? `${cart.user.firstname} ${cart.user.lastname}` : 'Guest'
  
  return (
    <button
      onClick={() => onSelect(cart)}
      className="w-full rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm outline-none active:bg-gray-50 focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <p className="font-medium text-gray-900">{customerName}</p>
      <div className="mt-2 flex justify-between text-sm text-gray-600">
        <span>{formatDate(cart.date)}</span>
        <span>{cart.status}</span>
      </div>
      <p className="mt-1 text-sm text-gray-500">{cart.itemCount} item(s)</p>
    </button>
  )
}

export default CartCard
