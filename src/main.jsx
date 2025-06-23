import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import './index.css'

const LoginPage = lazy(() => import('./pages/login'));
const RegisterPage = lazy(() => import('./pages/register'));
const ProductsPage = lazy(() => import('./pages/products'));
const DetailProductPage = lazy(() => import('./pages/detailProduct'));
const ErrorPage = lazy(() => import('./pages/404'));

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
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
          <RouterProvider router={router}/>
        </Suspense>
      </CartProvider>
  </StrictMode>,
);
