import React, { useState, useEffect } from 'react'
import API from '../configData.json'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import useStickyState from '../hooks/useStickyState'
import style from './List.module.css'
import Card from './Card'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'

const { url, params } = API
const qs = new URLSearchParams(params)

function List() {
	const [likedItems, setLikedItems] = useStickyState([], 'likedPhotos')
	const [isFetching, setIsFetching] = useInfiniteScroll(fetchMore)
	const [errorMessage, setErrorMessage] = useState('')
	const [photosData, setPhotosData] = useState([])
	const [noMore, setNoMore] = useState(false)
	const [page, setPage] = useState(1)

	const loadingTextInit = errorMessage
		? 'Problem fetching photos :('
		: 'Fetching photos ...'

	const loadingTextMore = noMore
		? 'No more photos!'
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
				const res = await fetch(`${url}?${qs}`)
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
		<>
			<ErrorMessage
				data-testid='fetch-error'
				{...{ errorMessage, type: 'error' }}
			/>
			{photosData.length > 0 && (
				<ul className={style.list} data-testid='fetch-list'>
					{photosData.map((data, i) => (
						<Card
							key={`${i}-${data?.id}`}
							{...{ likedItems, setLikedItems, ...data }}
						/>
					))}
				</ul>
			)}
			<Loader {...{ loadingText, isFetching }} />
		</>
	)
}

export default List
