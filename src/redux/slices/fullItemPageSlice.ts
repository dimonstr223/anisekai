import { RootState } from './../store'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAnimeInfo = createAsyncThunk<InfoElements, { id: string }>(
	'fullItemPage/fetchAnimeInfo',
	async params => {
		const { id } = params
		const { data } = await axios.get<InfoElements>(
			`https://shikimori.org/api/animes/${id}`
		)
		return data
	}
)

type genre = {
	id: number
	russian: string
}

type InfoElements = {
	name: string
	russian: string
	image: {
		original: string
	}
	kind: string
	status: string
	genres: genre[]
	description_html: string
	episodes: number
	duration: number
}

enum Status {
	PENDING = 'pending',
	FULFILLED = 'fulfield',
	REJECTED = 'rejected',
}

interface FullItemPageState {
	animeInfo: InfoElements
	status: Status
}

const initialState: FullItemPageState = {
	animeInfo: {
		name: '',
		russian: '',
		image: {
			original: '',
		},
		kind: '',
		status: '',
		genres: [],
		description_html: '',
		episodes: 0,
		duration: 0,
	},
	status: Status.PENDING,
}

const fullItemPageSlice = createSlice({
	name: 'fullItemPage',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchAnimeInfo.pending, state => {
				state.status = Status.PENDING
			})
			.addCase(fetchAnimeInfo.fulfilled, (state, action) => {
				state.animeInfo = action.payload
				state.status = Status.FULFILLED
			})
			.addCase(fetchAnimeInfo.rejected, state => {
				state.status = Status.REJECTED
			})
	},
})

export const fullItemPageSelector = (state: RootState) => state.fulItemPage

// export {} = fullItemPageSlice.actions

export default fullItemPageSlice.reducer
