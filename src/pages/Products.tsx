import { useState, useEffect } from 'react'
import { useProducts } from '../hooks/useProducts'
import ProductTable from '../components/products/ProductTable'
import ProductCard from '../components/products/ProductCard'
import ProductDetailModal from '../components/products/ProductDetailModal'
import AddProductForm from '../components/products/AddProductForm'
import Toast from '../components/ui/Toast'
import type { Product } from '../types/products'

function Products() {
    const { data: products, isLoading, error } = useProducts()
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [showSuccessToast, setShowSuccessToast] = useState(false)

    useEffect(() => {
        if (!showSuccessToast) return
        const timer = setTimeout(() => setShowSuccessToast(false), 3000)
        return () => clearTimeout(timer)
    }, [showSuccessToast])

    if (isLoading) return <p>Loading products...</p>
    if (error) return <p className="text-red-600">Failed to load products: {String(error)}</p>

    const categories = Array.from(new Set((products ?? []).map((p) => p.category)))

    return (
        <div>
        <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Products</h2>
            <button
            onClick={() => setIsAddOpen(true)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
            Add Product
            </button>
        </div>

        <ProductTable products={products ?? []} onSelect={setSelectedProduct} />

        <div className="space-y-3 md:hidden">
            {(products ?? []).map((product) => (
            <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
            ))}
        </div>

        <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

        <AddProductForm
            isOpen={isAddOpen}
            categories={categories}
            onClose={() => setIsAddOpen(false)}
            onSuccess={() => setShowSuccessToast(true)}
        />

        {showSuccessToast && (
            <Toast message="Product added successfully" onDismiss={() => setShowSuccessToast(false)} />
        )}
        </div>
    )
}

export default Products
