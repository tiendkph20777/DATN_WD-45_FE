import { RouteObject } from "react-router-dom";
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
import { CommentView } from "../views/admin/Comment";
import IndexAdmin from "../views/admin/Index";
import Signin from "../views/client/user/Signin";
import Signup from "../views/client/user/Signup";
import UserView from "../views/admin/User/UserView";
import UserUpdate from "../views/admin/User/UserUpdate";
import ProductDetail from "../views/client/product/ProductDetail";
import Cart from "../views/client/Cart/Cart";
import CheckOut from "../views/client/home/CheckOut";
import Blog from "../views/client/Blog/Blog";
import BlogDetail from "../views/client/Blog/BlogDetail";
import Profile from "../views/client/profile/Profile";
import { VoucherView } from "../views/admin/Voucher";
import VoucherAdd from "../views/admin/Voucher/VoucherAdd";
import VoucherEdit from "../views/admin/Voucher/VoucherEdit";
import UserAdd from "../views/admin/User/UserAdd";
import { PaymentView } from "../views/admin/payment";
import PaymentAdd from "../views/admin/payment/PaymentAdd";
import PaymentEdit from "../views/admin/payment/PaymentEdit";
import Dashboard from "../views/admin/Dashboard/Dashboard";
import Oops404 from "../views/client/Oops404/Oops404";
import OrderMane from "../views/admin/OrderMane/OrderMane";
import HistoryOrder from "../views/admin/OrderMane/HistoryOrder/HistoryOrder";
import Abortorder from "../views/admin/OrderMane/Abortorder/Abortorder";
import Ordersuccess from "../views/client/home/ordersuccess";
import History from "../views/client/profile/userpurchase/history";
import Orderhistory from "../views/client/profile/orderhistory";
import Purchase from "../views/client/profile/userpurchase/purchase";
import Shipway from "../views/client/profile/userpurchase/shipway";
import Transport from "../views/client/profile/userpurchase/transport";
import Receive from "../views/client/profile/userpurchase/receive";
import Canceled from "../views/client/profile/userpurchase/canceled";
import ProductWarehouse from "../views/admin/Product/ProductWarehouse";

const routes: RouteObject[] = [
    {
        path: '/admin',
        element: <IndexAdmin />,
        children: [
            {
                index: true,
                element: <Dashboard />
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
                path: 'product/warehouse', element: <ProductWarehouse />
            },
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
                path: 'product/detail/:id', element: <ProductDetailView />
            },
            {
                path: 'product/detail/add/:id', element: <ProductDetailAdd />
            },
            {
                path: 'product/detail/:idProduct/edit/:idProduct', element: <ProductProductEdit />
            },
            // Comment
            {
                path: 'comment', element: <CommentView />
            },
            //user
            {
                path: "user", element: <UserView />
            },
            {
                path: "user/:id/edit", element: <UserUpdate />
            },
            {
                path: "user/add", element: <UserAdd />
            },
            //voucher
            {
                path: 'voucher', element: <VoucherView />
            },
            {
                path: 'voucher/add', element: <VoucherAdd />
            },
            {
                path: 'voucher/:id/edit', element: <VoucherEdit />
            },
            //paymnet
            {
                path: 'payment', element: <PaymentView />
            },
            {
                path: 'payment/add', element: <PaymentAdd />
            },
            {
                path: 'payment/:idPayment/edit', element: <PaymentEdit />
            },
            // orderManagement
            {
                path: 'orderManagement', element: <OrderMane />
            },
            {
                path: 'historyOrder', element: <HistoryOrder />
            },
            {
                path: 'abortOrder', element: <Abortorder />
            },
            //status

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
                path: 'product/:_id/detail',

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
                path: 'blog',
                element: <Blog />
            },
            {
                path: 'blogDetail',
                element: <BlogDetail />
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'ordersuccess',
                element: <Ordersuccess />
            },
            //user purchase
            {
                path: 'orderhistory',
                element: <Orderhistory />
            },
            {
                path: 'purchase',
                element: <Purchase />
            },
            {
                path: 'receive',
                element: <Receive />
            },
            {
                path: 'transport',
                element: <Transport />
            },
            {
                path: 'shipway',
                element: <Shipway />
            },
            {
                path: 'history',
                element: <History />
            },
            {
                path: 'canceled',
                element: <Canceled />
            },

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
    {
        path: "*",
        element: <Oops404 />
    },
];

export default routes;
