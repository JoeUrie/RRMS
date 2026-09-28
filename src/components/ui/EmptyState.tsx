interface EmptyStateProps {
  message: string
}

function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
      {message}
    </div>
  )
}

export default EmptyState
