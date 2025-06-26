import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import MainLayout from './components/Layouts/MainLayouts'; 
import './index.css'

const LoginPage = lazy(() => import('./pages/login'));
const RegisterPage = lazy(() => import('./pages/register'));
const ProductsPage = lazy(() => import('./pages/products'));
const DetailProductPage = lazy(() => import('./pages/detailProduct'));
const ErrorPage = lazy(() => import('./pages/404'));
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
      path: '/login',
      element: <LoginPage />,
  },
  {
      path: '/register',
      element: <RegisterPage />,
  },
  {
      path: '/404',
      element: <ErrorPage />,
  },

  {
      element: <MainLayout />, 
      children: [
          {
              path: '/products',
              element: <ProductsPage />,
          },
          { 
              path: '/product/:id',
              element: <DetailProductPage />,
          },
          {
              path: '/',
              element: <Navigate to="/products" replace />,
          },
      ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
                <RouterProvider router={router}/>
            </Suspense>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
