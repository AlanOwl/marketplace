/* eslint-disable @typescript-eslint/no-unused-vars */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'



export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (payload: ILogin, thunkAPI) => {

		try {
			const res = await axios.post('/api/user/login', payload)
			return res.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)
export const authUser = createAsyncThunk(
	'user/authUser',
	async (payload) => {
		const res = await axios.put('/api/user/auth', payload)
		return res.data

	}
) 



export const createUser = createAsyncThunk(
	'user/createUser',
	async (payload: IRegister, thunkAPI) => {

		try {
			const res = await axios.post('/api/user/registration', payload)
			return res.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}

	}
)

interface Ipush {
	basketId: number | null;
	productId: number | string;
	sign: string;
}

interface IRegister {
	login: string,
	password: string,
}

interface ILogin {
	login: string,
	password: string,
}

interface IProduct {
	productId: number,
	quantity: number,
}

interface IOrder {
	total_cost: number;
	userId: number | string;
	basketId: number | string;
	products: IProduct[]
}

export const pushProductToCart = createAsyncThunk(
	'cart/pushProductToCart',
	async (payload: Ipush, thunkAPI) => {

		try {
			const res = await axios.post('/api/cart/pushToCart', payload)
			return res.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const getCart = createAsyncThunk(
	'user/getCart',
	async (payload: number, thunkAPI) => {

		try {
			const res = await axios.get(`/api/cart/getCart/${payload}`)
			return res.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}

	}
)


export const createOrder = createAsyncThunk(
	'order/CreateOrder',
	async (payload: IOrder, thunkAPI) => {

		try {
			const res = await axios.post('/api/order/createOrder', payload)
			return res.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

interface ICart {
	currentUser:{
		user : {
		id?: number | string,
		login?: string,
		password?: string,
		role?: string,
		createdAt?: string;
		updatedAt?: string;
		},
		token: string

	} | null,
	cart:[{
		id?: number,
		quantity: number;
		createdAt?: string;
		updatedAt?: string;
		basketId: number;
		productId: number;
		product: {
			id: number;
			title: string;
			price: number;
			img: string;
			vendor: string;
			description: string;
			createdAt: string;
			updatedAt: string;
		}
	}] | [],
	loading: boolean
}
const initialState: ICart = {
	currentUser: null,
	cart: [],
	loading: false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addItemToCart: (state, {payload}) => {
		}


	},

	extraReducers: (builder) => {
		builder.addCase(createOrder.fulfilled, (state) => {
			state.cart = []
		});

		builder.addCase(getCart.fulfilled, (state, { payload }) => {
			state.cart = payload
		});
		builder.addCase(getCart.rejected, (state,) => {
			state.loading = false
		});
		builder.addCase(createUser.fulfilled, (state, { payload }) => {
			state.currentUser = payload
			state.loading = true
		});
		builder.addCase(createUser.rejected, (state) => {
			state.loading = false
		});

		builder.addCase(loginUser.fulfilled, (state, { payload }) => {
			state.currentUser = payload
			state.loading = true
		});
		builder.addCase(loginUser.rejected, (state) => {
			state.currentUser = null
			state.loading = false
		});
	}
});

export const { addItemToCart } = userSlice.actions
export default userSlice.reducer