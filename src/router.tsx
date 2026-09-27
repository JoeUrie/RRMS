import { createBrowserRouter } from 'react-router'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Products from './pages/Products'
import Carts from './pages/Carts'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
        { index: true, element: <Home /> },
        { path: 'products', element: <Products /> },
        { path: 'carts', element: <Carts /> },
        ],
    },
])