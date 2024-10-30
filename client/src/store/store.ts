import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./user/userSlice"
import productsSlice from './products/productsSlice';
import ordersSlice from './orders/ordersSlice';

export const store =  configureStore({
	reducer: {
		user: userSlice,
		products: productsSlice,
		orders: ordersSlice
	}
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default store