import { useState, useEffect } from 'react'
import debounce from '../utils/debounce'

const useInfiniteScroll = (callback) => {
	const [isFetching, setIsFetching] = useState(false)

	useEffect(() => {
		const debounceHandleScroll = debounce(handleScroll, 1500)
		window?.addEventListener('scroll', debounceHandleScroll)
		return () => {
			window?.removeEventListener('scroll', debounceHandleScroll)
		}
	}, [])

	useEffect(() => {
		if (!isFetching) return
		callback()
	}, [callback, isFetching])

	function handleScroll() {
		const scrollTop =
			(document?.documentElement && document?.documentElement.scrollTop) ||
			document?.body.scrollTop
		const scrollHeight =
			(document?.documentElement && document?.documentElement.scrollHeight) ||
			document.body.scrollHeight
		if (scrollTop + window?.innerHeight + 50 >= scrollHeight) {
			setIsFetching(true)
		}
	}

	return [isFetching, setIsFetching]
}

export default useInfiniteScroll
