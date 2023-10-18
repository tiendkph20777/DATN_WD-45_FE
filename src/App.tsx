import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import LayoutAdmin from "./components/layouts/LayoutsAdmin";
import AddProduct from "./pages/admin/addProduct";
import Dashboard from "./pages/admin/dashboard";
import UpdateProduct from "./pages/admin/updateProduct";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <Navigate to="products" /> },
      { path: "products", element: <Dashboard /> },
      {
        path: "products/add",
        element: <AddProduct />,
      },
      {
        path: "products/edit/:idProduct",
        element: <UpdateProduct />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
