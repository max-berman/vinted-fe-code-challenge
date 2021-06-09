const debounce = (callback, wait = 250) => {
	let timer
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => callback(...args), wait)
	}
}

// function debounce(func, wait = 250, immediate) {
// 	var timeout
// 	return function () {
// 		var context = this,
// 			args = arguments
// 		var later = function () {
// 			timeout = null
// 			if (!immediate) func.apply(context, args)
// 		}
// 		var callNow = immediate && !timeout
// 		clearTimeout(timeout)
// 		timeout = setTimeout(later, wait)
// 		if (callNow) func.apply(context, args)
// 	}
// }

export default debounce
