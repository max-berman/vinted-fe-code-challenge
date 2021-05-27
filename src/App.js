import React, { useState, useEffect } from 'react'
import API from './configData.json'
import './styles/global.css'
import './App.css'
import useInfiniteScroll from './hooks/UseInfiniteScroll'
import Card from './components/Card'

const { url, params } = API
const qs = new URLSearchParams(params)

function App() {
	const [isFetching, setIsFetching] = useInfiniteScroll(fetchMore)
	const [errorMessage, setErrorMessage] = useState('')
	const [photosData, setPhotosData] = useState([])
	const [noMore, setNoMore] = useState(false)
	const [page, setPage] = useState(1)

	const loadingTextInit = errorMessage
		? 'Problem fetching photos'
		: 'Fetching photos ...'

	const loadingTextMore = noMore
		? 'No more photos :('
		: 'Fetching more photos ...'

	const loadingText =
		photosData.length === 0 ? loadingTextInit : loadingTextMore

	function fetchMore() {
		setPage((prev) => prev + 1)
		setIsFetching(false)
	}

	useEffect(() => {
		const fetchData = async () => {
			qs.set('page', page)
			try {
				const res = await fetch(`${url}${qs}`)
				const data = await res.json()
				if (res.ok && data.stat === 'ok') {
					setPhotosData((prev) => [...prev, ...data.photos.photo])
					setNoMore(data.photos.photo.length === 0)
					return
				}
				throw new Error(data.message)
			} catch (error) {
				console.log(error)
				setErrorMessage(error.message)
			}
		}
		fetchData()
	}, [page])

	return (
		<div className='App'>
			{!!errorMessage && <div className='alert-error'>{errorMessage}</div>}
			<ul>
				{photosData.map((data, i) => (
					<Card key={`${i}-${data?.id}`} {...data} />
				))}
			</ul>
			{!isFetching && <div className='loader'>{loadingText}</div>}
		</div>
	)
}

export default App
