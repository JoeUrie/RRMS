import Modal from '../ui/Modal'
import type { EnrichedCart } from '../../types/cart'

interface CartDetailModalProps {
  cart: EnrichedCart | null
  onClose: () => void
}

function CartDetailModal({ cart, onClose }: CartDetailModalProps) {
  if (!cart) return null

  return (
    <Modal
      isOpen={!!cart}
      onClose={onClose}
      title={cart.user ? `${cart.user.firstname} ${cart.user.lastname}` : 'Guest Cart'}
    >
      <div className="space-y-5">
        {cart.user ? (
          <dl className="grid grid-cols-2 gap-y-2 text-sm">
            <dt className="text-gray-500">Email</dt>
            <dd className="text-gray-900">{cart.user.email}</dd>

            <dt className="text-gray-500">Phone</dt>
            <dd className="text-gray-900">{cart.user.phone}</dd>

            <dt className="text-gray-500">City / State</dt>
            <dd className="text-gray-900">
              {cart.user.city}, {cart.user.state}
            </dd>

            <dt className="text-gray-500">Zip Code</dt>
            <dd className="text-gray-900">{cart.user.zipcode}</dd>
          </dl>
        ) : (
          <div className="rounded-md bg-gray-50 p-3 text-sm text-gray-500">
            Guest checkout — user data unavailable.
          </div>
        )}

        <div>
          <h4 className="mb-2 text-sm font-semibold text-gray-900">Items</h4>
          <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
            {cart.items.map((item, index) => (
              <li key={`${item.productId}-${index}`} className="flex items-start justify-between p-3">
                <div>
                  <p className="font-medium text-gray-900">
                    {item.product ? item.product.name : 'Product unavailable'}
                  </p>
                  {item.product && (
                    <p className="mt-1 text-sm text-gray-500">{item.product.description}</p>
                  )}
                </div>
                <span className="whitespace-nowrap pl-4 text-sm text-gray-700">
                  Qty: {item.quantity}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  )
}

export default CartDetailModal
