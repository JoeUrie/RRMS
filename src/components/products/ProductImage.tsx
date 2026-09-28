import { useState } from 'react'

interface ProductImageProps {
    src: string
    alt: string
    className?: string
}

function ProductImage({ src, alt, className }: ProductImageProps) {
    const [errored, setErrored] = useState(false)

    if (errored) {
        return (
            <div className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className ?? ''}`}>
                <span className="text-xs">No image available</span>
            </div>
        )
    }

return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className={className}
    />
  )
}

export default ProductImage