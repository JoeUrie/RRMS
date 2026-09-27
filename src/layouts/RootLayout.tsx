import { Outlet, Link } from 'react-router'

function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <Link to="/" className="text-xl font-semibold text-gray-900">
          RRMS Product &amp; Cart Viewer
        </Link>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
