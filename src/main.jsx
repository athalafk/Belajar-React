import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import ErrorPage from './pages/404'
import ProductsPage from './pages/products'
import DetailProductPage from './pages/detailProduct'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
    errorElement: <Navigate to="/404" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
    {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/products',
    element: <ProductsPage />,
  },
  { 
    path: '/product/:id',
    element: <DetailProductPage />,
  },
  {
    path: '/404',
    element: <ErrorPage />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router}/>
    </CartProvider>
  </StrictMode>,
);
