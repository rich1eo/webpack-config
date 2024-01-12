import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App } from './components/App'
import { AboutPage } from '@/pages/AboutPage'
import { ShopPage } from '@/pages/ShopPage'

const root = document.getElementById('root')

if (!root) throw new Error('Root not found')

const container = createRoot(root)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: '/shop',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ShopPage />
          </Suspense>
        ),
      },
    ],
  },
])

container.render(<RouterProvider router={router} />)
