import React from 'react'
import style from './ErrorMessage.module.css'

function ErrorMessage({ errorMessage, type = 'error' }) {
	// errorMessage consists of 4 types: error | warning | info | success
	return (
		!!errorMessage && (
			<div className={`${style.alert} ${style[type]}`}>{errorMessage}</div>
		)
	)
}

export default ErrorMessage
