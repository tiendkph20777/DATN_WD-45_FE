
import { configureStore } from '@reduxjs/toolkit'
import brandAPI from './services/brand.service'
import productAPI from './services/product.service'
import authAPI from './services/user.service'
import roleAPI from './services/role.service'
import productAPIDetall from './services/productDetail.service'
import voucherAPI from './services/voucher.service'
import cartAPI from './services/cart.service'
import paymentAPI from './services/payment.service'
import checkoutAPI from './services/checkout.service'
import commentAPI from './services/comment.service'

export const store = configureStore({
  reducer: {
    "product": productAPI.reducer,
    "brand": brandAPI.reducer,
    "auth": authAPI.reducer,
    "role": roleAPI.reducer,
    "products": productAPIDetall.reducer,
    "voucher": voucherAPI.reducer,
    "cart": cartAPI.reducer,
    "payment": paymentAPI.reducer,
    "checkout": checkoutAPI.reducer,
    "comment": commentAPI.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(commentAPI.middleware, productAPI.middleware, brandAPI.middleware, authAPI.middleware, roleAPI.middleware, productAPIDetall.middleware, voucherAPI.middleware, cartAPI.middleware, paymentAPI.middleware, checkoutAPI.middleware),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch