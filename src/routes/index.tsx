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
import Index from "../views/client/home/Index";
import IndexProduct from "../views/client/product/Index";
import HomeClient from "../views/client/Home";
import IndexAdmin from "../views/admin";
import IndexAbout from "../views/client/about/IndexAbout";

const routes: RouteObject[] = [
    {
        path: '/admin',
        element: <Dashboard />,
        children: [
            {
                index: true,
                element: <IndexAdmin />
            },
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
    {
        path: '/',
        element: <HomeClient />,
        children: [
            {
                index: true,
                element: <Index />
            },
            {
                path: 'product',
                element: <IndexProduct />
            },
            {
                path: 'about',
                element: <IndexAbout />
            }
        ]
    }
];

export default routes;
