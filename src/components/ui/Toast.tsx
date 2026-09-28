interface ToastProps {
    message: string
    onDismiss: () => void
}

function Toast({ message, onDismiss }: ToastProps) {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white shadow-lg">
            <span>{message}</span>
            <button onClick={onDismiss} className="text-green-100 hover:text-white">
                ✕
            </button>
        </div>
    )
}

export default Toast