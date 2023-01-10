import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import DashboardLayout from './layouts/dashboard'

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { element: <Navigate to="/dashboard/books" />, index: true },
      { path: 'books', element: <div>Books page</div> },
      { path: 'authors', element: <div>Authors page</div> },
      { path: 'users', element: <div>Users page</div> },
    ],
  },
  {
    path: 'login',
    element: <div>Login page</div>,
  },
  {
    element: <div>Default page</div>,
    children: [
      // this redirect doesn't work
      { element: <Navigate to="/dashboard/books" />, index: true },
      { path: '404', element: <>404 page</> },
      { path: '/', element: <Navigate to="/dashboard/app" />, index: true },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
])

const Routes: React.FC = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default Routes
