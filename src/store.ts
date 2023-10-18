
import { configureStore } from '@reduxjs/toolkit'
import brandAPI from './services/brand.service'
import productAPI from './services/product.service'
import authAPI from './services/user.service'

export const store = configureStore({
  reducer: {
    "product": productAPI.reducer,
    "brand": brandAPI.reducer,
    "auth": authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productAPI.middleware, brandAPI.middleware, authAPI.middleware),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
