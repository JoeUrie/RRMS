import type { Product } from "../../types/products"

interface ProductTableProps {
    products: Product[]
    onSelect: (product: Product) => void
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
                    onClick={() => onSelect(product)}
                    className="cursor-pointer border-b border-gray-100 hover:bg-gray-50"
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