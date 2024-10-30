/* eslint-disable prefer-const */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface ISort {
	userId: string;
	sortType: {
		category1: string,
		category2: string,
	};
}

export const getOrders = createAsyncThunk(
	'order/getOrders',
	async (payload: ISort, thunkAPI) => {
	 let {userId, sortType}= payload
		try {
			const res = await axios.get(`/api/order/getOrders/${userId}/${sortType.category1}/${sortType.category2}`)
			return res.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}

	}
)


export const ordersSlice = createSlice({
	name: 'orders',
	initialState: {
		list: [],
		loading: false
	},
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(getOrders.fulfilled, (state, { payload }) => {
			state.list = payload
		});
	},
});

export default ordersSlice.reducer