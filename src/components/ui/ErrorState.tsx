interface ErrorStateProps {
  message: string
}

function ErrorState({ message }: ErrorStateProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
    >
      <p className="font-medium">Something went wrong</p>
      <p className="mt-1">{message}</p>
    </div>
  )
}

export default ErrorState
