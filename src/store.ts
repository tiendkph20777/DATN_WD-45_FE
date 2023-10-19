import { configureStore } from '@reduxjs/toolkit'
import productAPI from './services/product.service'
import authAPI from './services/user.service'
import roleAPI from './services/role.service'

export const store = configureStore({
  reducer: {
    "products": productAPI.reducer,
    "auth": authAPI.reducer,
    "role": roleAPI.reducer,
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat(productAPI.middleware, authAPI.middleware, roleAPI.middleware),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
