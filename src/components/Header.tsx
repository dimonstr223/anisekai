import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { navbarSelector, setContent } from '../redux/slices/navbarSlice'
import Navbar from './Navbar'

const Header: React.FC = () => {
	const dispatch = useAppDispatch()
	const { contentList } = useAppSelector(navbarSelector)

	const homeContent = contentList.find(obj => obj.property === '')

	return (
		<header className='header'>
			<Link
				to='/'
				// onClick={() => homeContent && dispatch(setContent(homeContent))}
			>
				<div className='header__logo'>
					<img src={'./img/logo.svg'} className='header__logo' alt='logo' />
					<div className='logoText'>anisekai</div>
				</div>
			</Link>
			<Navbar />
		</header>
	)
}

export default Header
