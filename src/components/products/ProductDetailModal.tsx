import Modal from '../ui/Modal'
import ProductImage from './ProductImage'
import type { Product } from '../../types/products'

interface ProductDetailModalProps {
    product: Product | null
    onClose: () => void
}

function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
    if (!product) return null

    return (
        <Modal isOpen={!!product} onClose={onClose} title={product.name}>
            <div className="space-y-4">
                <ProductImage
                    src={product.image_url}
                    alt={product.name}
                    className="h-48 w-full rounded-lg object-cover"
                />
                <p className="text-gray-700">{product.description}</p>
                <dl className="grid grid-cols-2 gap-y-2 text-sm">
                    <dt className="text-gray-500">Price</dt>
                    <dd className="text-gray-900">${product.price.toFixed(2)}</dd>

                    <dt className="text-gray-500">Category</dt>
                    <dd className="text-gray-900">{product.category}</dd>

                    <dt className="text-gray-500">In stock</dt>
                    <dd className="text-gray-900">{product.stock}</dd>

                    <dt className="text-gray-500">SKU</dt>
                    <dd className="text-gray-900">{product.sku}</dd>

                    <dt className="text-gray-500">Rating</dt>
                    <dd className="text-gray-900">
                        {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
                    </dd>
                </dl>
            </div>
        </Modal>
    )
}

export default ProductDetailModal