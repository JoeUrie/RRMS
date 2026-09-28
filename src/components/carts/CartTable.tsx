import type { KeyboardEvent } from 'react'
import type { EnrichedCart } from '../../types/cart'

interface CartTableProps {
  carts: EnrichedCart[]
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

function statusBadgeClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-700'
    case 'pending':
      return 'bg-yellow-100 text-yellow-700'
    case 'abandoned':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

function handleRowKeyDown(event: KeyboardEvent<HTMLTableRowElement>, onActivate: () => void) {
  // <tr> is not natively keyboard-operable, so Enter/Space must be wired
  // up manually to match the behavior a native <button> gets for free.
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    onActivate()
  }
}

function CartTable({ carts, onSelect }: CartTableProps) {
  return (
    <table className="hidden w-full border-collapse text-left md:table">
      <thead>
        <tr className="border-b border-gray-200 text-sm text-gray-500">
          <th className="py-3 pr-4">Customer</th>
          <th className="py-3 pr-4">Date</th>
          <th className="py-3 pr-4">Status</th>
          <th className="py-3 pr-4">Items</th>
        </tr>
      </thead>
      <tbody>
        {carts.map((cart) => {
          const customerName = cart.user ? `${cart.user.firstname} ${cart.user.lastname}` : 'Guest'
          return (
            <tr
              key={cart.id}
              tabIndex={0}
              role="button"
              onClick={() => onSelect(cart)}
              onKeyDown={(e: KeyboardEvent<HTMLTableRowElement>) =>
                handleRowKeyDown(e, () => onSelect(cart))
              }
              className="cursor-pointer border-b border-gray-100 hover:bg-gray-50 focus:outline-none focus-visible:bg-blue-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
            >
              <td className="py-3 pr-4 font-medium text-gray-900">{customerName}</td>
              <td className="py-3 pr-4 text-gray-700">{formatDate(cart.date)}</td>
              <td className="py-3 pr-4">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${statusBadgeClass(cart.status)}`}
                >
                  {cart.status}
                </span>
              </td>
              <td className="py-3 pr-4 text-gray-700">{cart.itemCount}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default CartTable
