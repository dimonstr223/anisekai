import { RootState } from './../store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchContent = createAsyncThunk<Item[], void>(
	'anime/fetchContent',
	async () => {
		const { data } = await axios.get<Item[]>(
			`https://shikimori.one/api/animes?limit=50&page=1&order=popularity`
		)
		return data
	}
)

enum Status {
	PENDING = 'pending',
	FULFILLED = 'fulfilled',
	REJECTED = 'rejected',
}

type Item = {
	id: number
	image: { original: string; preview: string }
	name: string
}

interface AnimeSliceState {
	items: Item[]
	status: Status
}

const initialState: AnimeSliceState = {
	items: [],
	status: Status.PENDING,
}

const animeSlice = createSlice({
	name: 'anime',
	initialState,
	reducers: {
		setContent(state, action) {
			state.items = action.payload
		},
	},
	// extraReducers: {
	// 	[fetchContent.pending]: state => {
	// 		state.status = Status.PENDING
	// 	},
	// 	[fetchContent.fulfilled]: (state, action) => {
	// 		state.status = Status.FULFILLED
	// 		state.items = action.payload
	// 	},
	// 	[fetchContent.rejected]: state => {
	// 		state.status = Status.REJECTED
	// 		state.items = []
	// 	},
	// },
	extraReducers(builder) {
		builder
			.addCase(fetchContent.pending, state => {
				state.status = Status.PENDING
				state.items = []
			})
			.addCase(fetchContent.fulfilled, (state, action) => {
				state.items = action.payload
				state.status = Status.FULFILLED
			})
			.addCase(fetchContent.rejected, state => {
				state.status = Status.REJECTED
				state.items = []
			})
	},
})

export const animeSelector = (state: RootState) => state.anime

export const { setContent } = animeSlice.actions

export default animeSlice.reducer
