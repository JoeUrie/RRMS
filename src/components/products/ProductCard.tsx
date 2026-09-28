import type { Product } from "../../types/products"

interface ProductCardProps {
    product: Product
    onSelect: (product: Product) => void
}

function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <button
      onClick={() => onSelect(product)}
      className="w-full rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm active:bg-gray-50"
    >
      <p className="font-medium text-gray-900">{product.name}</p>
      <div className="mt-2 flex justify-between text-sm text-gray-600">
        <span>${product.price.toFixed(2)}</span>
        <span>{product.category}</span>
      </div>
      <p className="mt-1 text-sm text-gray-500">In stock: {product.stock}</p>
    </button>
  )
}

export default ProductCard