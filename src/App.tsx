import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './pages/admin/dashboard'

const router = createBrowserRouter([
  {
    path: '/', element: <Dashboard />
  }
])
function App() {
  return <RouterProvider router={router} />
}

export default App
