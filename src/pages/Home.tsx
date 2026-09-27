import { Link } from 'react-router'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20">
      <h1 className="text-2xl font-bold text-gray-900">Welcome</h1>
      <div className="flex gap-4">
        <Link
          to="/products"
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Products
        </Link>
        <Link
          to="/carts"
          className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-700"
        >
          Carts
        </Link>
      </div>
    </div>
  )
}

export default Home