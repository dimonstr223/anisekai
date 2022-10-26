import { configureStore } from '@reduxjs/toolkit'
import navbar from './slices/navbarSlice'
import anime from './slices/animeSlice'
import fulItemPage from './slices/fullItemPageSlice'

export const store = configureStore({
	reducer: {
		navbar,
		anime,
		fulItemPage,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
