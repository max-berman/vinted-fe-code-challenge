import React, { useState, useEffect } from 'react'
import './styles/global.css'
import './App.css'
import useInfiniteScroll from './hooks/UseInfiniteScroll'

const urlParams = {
	api_key: '879dc778faa8db7a5cf203819045e10e',
	method: 'flickr.photos.search',
	tags: 'retro,vintage',
	tag_mode: 'all',
	content_type: 3,
	per_page: 50,
	format: 'json',
	nojsoncallback: 1,
	sort: 'relevance',
	page: 1,
}

const Photo = ({ title, id, secret, server }) => {
	return (
		<img
			alt={`${title}`}
			src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`}
		/>
	)
}

function App() {
	const [photosData, setPhotosData] = useState([])
	const [page, setPage] = useState(urlParams.page)
	const [isFetching, setIsFetching] = useInfiniteScroll(fetchMore)
	const [resErrorMessage, setResErrorMessage] = useState('')

	function fetchMore() {
		setPage((prev) => prev + 1)
		setIsFetching(false)
	}

	useEffect(() => {
		const fetchData = async () => {
			urlParams.page = page
			const qs = new URLSearchParams(urlParams)
			const API_URL = `https://api.flickr.com/services/rest/?${qs}`
			try {
				const res = await fetch(API_URL)
				const data = await res.json()
				console.log(data.photos.photo)
				setPhotosData((prev) => [...prev, ...data.photos.photo])
			} catch (err) {
				console.log(err)
				setResErrorMessage(err)
			}
		}
		fetchData()
	}, [page])

	return (
		<div className='App'>
			<ul>
				{photosData.map(({ id, server, secret, title }, i) => (
					<li key={i} className='card'>
						<Photo {...{ title, id, secret, server }} />
					</li>
				))}
			</ul>
			{!isFetching && <div className='loader'>Fetching photos ...</div>}
		</div>
	)
}

export default App
