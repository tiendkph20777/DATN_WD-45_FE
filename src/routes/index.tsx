import { RouteObject } from "react-router-dom";
import Dashboard from "../views/admin/Dashboard";
import { RoleView } from "../views/admin/Category";
import CategoryAdd from "../views/admin/Category/CategoryAdd";
import CategoryEdit from "../views/admin/Category/CategoryEdit";
import { ProductView } from "../views/admin/Product";
import ProductAdd from "../views/admin/Product/ProductAdd";
import ProductEdit from "../views/admin/Product/ProductEdit";
import { ProductDetailView } from "../views/admin/ProductDetail";
import ProductDetailAdd from "../views/admin/ProductDetail/ProductDetailAdd";
import ProductProductEdit from "../views/admin/ProductDetail/ProductDetailEdit";

const routes: RouteObject[] = [
    {
        path: '/admin',
        element: <Dashboard />,
        children: [
            {
                path: 'category', element: <RoleView />
            },
            {
                path: 'category/add', element: <CategoryAdd />
            },
            {
                path: 'category/:id/edit', element: <CategoryEdit />
            },
            // Product
            {
                path: 'product', element: <ProductView />
            },
            {
                path: 'product/add', element: <ProductAdd />
            },
            {
                path: 'product/:id/edit', element: <ProductEdit />
            },
            // Product Detail
            {
                path: 'product/detail', element: <ProductDetailView />
            },
            {
                path: 'product/detail/add', element: <ProductDetailAdd />
            },
            {
                path: 'product/detail/:id/edit', element: <ProductProductEdit />
            },
        ],
    },
];

export default routes;
