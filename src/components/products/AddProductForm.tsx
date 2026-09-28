import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReactNode } from 'react'
import Modal from '../ui/Modal'
import { productFormSchema } from '../../schemas/productFormSchema'

interface AddProductFormProps {
    isOpen: boolean
    categories: string[]
    onClose: () => void
    onSuccess: () => void
}

const inputClass =
    'mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'

function AddProductForm({ isOpen, categories, onClose, onSuccess }: AddProductFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(productFormSchema),
    })

    const onSubmit = () => {
        // there is no backend for adding a product, this is just to show form validation
        reset()
        onClose()
        onSuccess()
    }

    const handleClose = () => {
        reset()
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Add Product">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <Field label="Name" error={errors.name?.message}>
                    <input {...register('name')} className={inputClass} />
                </Field>

                <Field label="Price" error={errors.price?.message}>
                    <input type="number" step="0.01" {...register('price')} className={inputClass} />
                </Field>

                <Field label="Category" error={errors.category?.message}>
                    <input list="category-options" {...register('category')} className={inputClass} />
                    <datalist id="category-options">
                        {categories.map((c) => (
                        <option key={c} value={c} />
                        ))}
                    </datalist>
                </Field>

                <Field label="Description" error={errors.description?.message}>
                    <textarea {...register('description')} rows={3} className={inputClass} />
                </Field>

                <Field label="Number in stock" error={errors.stock?.message}>
                    <input type="number" {...register('stock')} className={inputClass} />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                    <Field label="Rating (0–5)" error={errors.rate?.message}>
                        <input type="number" step="0.1" {...register('rate')} className={inputClass} />
                    </Field>
                    <Field label="Rating count" error={errors.ratingCount?.message}>
                        <input type="number" {...register('ratingCount')} className={inputClass} />
                    </Field>
                </div>

                <Field label="Image URL" error={errors.image_url?.message}>
                    <input {...register('image_url')} className={inputClass} />
                </Field>

                <Field label="SKU" error={errors.sku?.message}>
                    <input {...register('sku')} className={inputClass} />
                </Field>

                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Save Product
                    </button>
                </div>
            </form>
        </Modal>
    )
}

interface FieldProps {
    label: string
    error?: string
    children: ReactNode
}

function Field({ label, error, children }: FieldProps) {
    return (
        <label className="block">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            {children}
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </label>
    )
}

export default AddProductForm
