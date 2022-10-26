import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Header from './components/Header'
import Anime from './pages/Anime'
import FullItemPage from './pages/FullItemPage'
import Home from './pages/Home'
import Manga from './pages/Manga'
import Ranobe from './pages/Ranobe'

const App: React.FC = () => {
	return (
		<div className='App'>
			<Header />
			<main className='main'>
				<div className='container'>
					<div className='animeItems'>
						<Routes>
							<Route path='' element={<Home />} />
							<Route path='/animes' element={<Anime />} />
							<Route path='/animes/:id' element={<FullItemPage />} />
							<Route path='/mangas' element={<Manga />} />
							<Route path='/ranobe' element={<Ranobe />} />
						</Routes>
					</div>
				</div>
			</main>
		</div>
	)
}

export default App
