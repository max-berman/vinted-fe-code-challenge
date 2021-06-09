import { useState, useEffect } from 'react'

function useStickyState(defaultValue, key) {
	const stickyValue = window?.localStorage.getItem(key)
	const [value, setValue] = useState(
		stickyValue === null ? defaultValue : JSON.parse(stickyValue)
	)

	useEffect(() => {
		window?.localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue]
}

export default useStickyState
