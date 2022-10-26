import parse from 'html-react-parser'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import {
	fetchAnimeInfo,
	fullItemPageSelector,
} from '../redux/slices/fullItemPageSlice'

const FullItemPage = () => {
	const dispatch = useAppDispatch()
	const { animeInfo } = useAppSelector(fullItemPageSelector)

	console.log(animeInfo)

	type QuizParams = {
		id: string
	}
	const { id } = useParams<QuizParams>()

	const parseDescription = animeInfo?.description_html

	React.useEffect(() => {
		id && dispatch(fetchAnimeInfo({ id }))
	}, [])

	return (
		<div className='fullItem'>
			<h1 className='name'>{`${animeInfo?.russian} / ${animeInfo?.name}`}</h1>
			<div className='information'>
				<div>
					<div className='itemImage'>
						<img
							src={`https://shikimori.org/${animeInfo?.image.original}`}
							alt='title image'
						/>
					</div>
					<button className='addToListBtn'>
						<div>
							<svg
								width='20'
								height='20'
								enableBackground='new 0 0 512 512'
								viewBox='0 0 512 512'
							>
								<polygon
									fill='#176093'
									points='448 224 288 224 288 64 224 64 224 224 64 224 64 288 224 288 224 448 288 448 288 288 448 288'
								/>
							</svg>
						</div>
						Добавить в список
					</button>
				</div>

				<div>
					<div>
						<h3 className='title'>Информация</h3>
						<ul>
							<li>
								Тип: <span>{animeInfo?.kind}</span>
							</li>
							<li>
								Эпизоды: <span>{animeInfo?.episodes}</span>
							</li>
							<li>
								Длительность эпизода: <span>{animeInfo?.duration} мин.</span>
							</li>
							<li>
								Статус: <span className='itemStatus'>{animeInfo?.status}</span>
							</li>
							<li>
								<div className='genres'>
									Жанры:
									<ul>
										{animeInfo?.genres.map(genre => (
											<li key={genre.id}>{genre.russian}</li>
										))}
									</ul>
								</div>
							</li>
						</ul>
					</div>
					<div className='description'>
						<h3 className='title'>Описание</h3>
						<div>{parseDescription && parse(parseDescription)}</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FullItemPage
