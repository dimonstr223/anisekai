import { RootState } from './../store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Content = {
	name: string
	property: string
}

interface NavbarSliceState {
	contentList: Content[]
	open: boolean
	content: Content
}

const initialState: NavbarSliceState = {
	contentList: [
		// { name: 'Home', property: '' },
		{ name: 'Anime', property: '/animes' },
		{ name: 'Manga', property: '/mangas' },
		{ name: 'Ranobe', property: '/ranobe' },
	],
	content: { name: 'Home', property: '' },
	open: false,
}

const navbarSlice = createSlice({
	name: 'navbar',
	initialState,
	reducers: {
		setOpen(state, action: PayloadAction<boolean>) {
			state.open = action.payload
		},
		setContent(state, action: PayloadAction<Content>) {
			state.content = action.payload
		},
	},
})

export const navbarSelector = (state: RootState) => state.navbar

export const { setOpen, setContent } = navbarSlice.actions

export default navbarSlice.reducer
