import type { KeyboardEvent } from 'react'
import type { Product } from "../../types/products"

interface ProductTableProps {
    products: Product[]
    onSelect: (product: Product) => void
}

function handleRowKeyDown(event: KeyboardEvent<HTMLTableRowElement>, onActivate: () => void) {
    // <tr> is not natively keyboard-operable, so Enter/Space must be wired
    // up manually to match the behavior a native <button> gets for free.
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onActivate()
    }
}

function ProductTable({ products, onSelect }: ProductTableProps) {
    return (
        <table className="hidden w-full border-collapse text-left md:table">
            <thead>
                <tr className="border-b border-gray-200 text-sm text-gray-500">
                    <th className="py-3 pr-4">Name</th>
                    <th className="py-3 pr-4">Price</th>
                    <th className="py-3 pr-4">Category</th>
                    <th className="py-3 pr-4">In Stock</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                <tr
                    key={product.id}
                    tabIndex={0}
                    role="button"
                    onClick={() => onSelect(product)}
                    onKeyDown={(e: KeyboardEvent<HTMLTableRowElement>) =>
                        handleRowKeyDown(e, () => onSelect(product))
                    }
                    className="cursor-pointer border-b border-gray-100 hover:bg-gray-50 focus:outline-none focus-visible:bg-blue-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
                >
                    <td className="py-3 pr-4 font-medium text-gray-900">{product.name}</td>
                    <td className="py-3 pr-4 text-gray-700">${product.price.toFixed(2)}</td>
                    <td className="py-3 pr-4 text-gray-700">{product.category}</td>
                    <td className="py-3 pr-4 text-gray-700">{product.stock}</td>
                </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ProductTable