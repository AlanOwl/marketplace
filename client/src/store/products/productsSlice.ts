import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


interface ICategory {
	category1: string;
	category2: string;
}


export const getProducts = createAsyncThunk(
	'product/getProducts',
	async (payload: ICategory, thunkAPI) => {
		const { category1, category2 } = payload
		try {
			const res = await axios.get(`/api/product/${category1}/${category2}`)
			return res.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}

	}
)

export const createProduct = createAsyncThunk(
	'product/createProduct',
	async (payload, thunkAPI) => {

		try {
			const res = await axios.post('/api/product', payload)
			return res.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}

	}
)

interface Ilist {
	list: {
		count: number | string,
		rows: [{
			id: number | string,
			title: string,
			price: number | string,
			img: string,
			vendor: string,
			description: string
		}]
	}
	isLoading: boolean
}
const initialState: Ilist = {
	list: {
		count: "",
		rows: [{
			id: "" ,
			title: "",
			price: "",
			img: "",
			vendor: "",
			description: ""
		}]
	},
	isLoading: false
}

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(getProducts.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getProducts.fulfilled, (state, { payload }) => {
			state.list = payload;
			state.isLoading = false;
		});
		builder.addCase(getProducts.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export default productsSlice.reducer