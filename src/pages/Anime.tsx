import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { animeSelector, fetchContent } from '../redux/slices/animeSlice'

const Anime: React.FC = () => {
	const dispatch = useAppDispatch()
	const { items } = useAppSelector(animeSelector)

	React.useEffect(() => {
		dispatch(fetchContent())
	}, [])

	const getAnime = items.map(item => (
		<Link key={item.id} to={`/animes/${item.id}`} className='item'>
			<div className='imgCutter'>
				<img
					className='posterImage'
					src={'https://shikimori.one/' + item.image.original}
					alt='poster'
				/>
			</div>
			<h4 className='item__title'>{item.name}</h4>
		</Link>
	))

	return (
		<>
			<div className='animeItems'>{getAnime}</div>
		</>
	)
}

export default Anime
