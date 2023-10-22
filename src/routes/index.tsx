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
import IndexAdmin from "../views/admin/Index";
import IndexAbout from "../views/client/about/IndexAbout";
import Signin from "../views/client/user/Signin";
import Signup from "../views/client/user/Signup";
import UserView from "../views/admin/User/UserView";
import UserUpdate from "../views/admin/User/UserUpdate";
import ProductDetail from "../views/client/product/ProductDetail";
import Cart from "../views/client/home/Cart";
import CheckOut from "../views/client/home/CheckOut";
import Blog from "../views/client/home/Blog";
import BlogDetail from "../views/client/home/BlogDetail";

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
                path: 'category/:idBrand/edit', element: <CategoryEdit />
            },
            // Product
            {
                path: 'product', element: <ProductView />
            },
            {
                path: 'product/add', element: <ProductAdd />
            },
            {
                path: 'product/:idProduct/edit', element: <ProductEdit />
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
            //user
            {
                path: "user", element: <UserView />
            },
            {
                path: "user/:id/edit", element: <UserUpdate />
            }
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
                path: 'product/1/detail',
                element: <ProductDetail />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'checkout',
                element: <CheckOut />
            },
            {
                path:'blog',
                element: <Blog />
            },
            {
                path:'blogDetail',
                element: <BlogDetail/>
            }
        ]
    },
    {
        path: '/signin',
        element: <Signin />
    },
    {
        path: '/signup',
        element: <Signup />
    },
];

export default routes;
