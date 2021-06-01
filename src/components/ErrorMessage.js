import React from 'react'
import style from './ErrorMessage.module.css'

const Styles = {
	error: 'error',
	warning: 'warning',
	info: 'info',
	success: 'success',
}

function ErrorMessage({ errorMessage, type }) {
	const getStyleClass = (type) => Styles[type] || Styles.error //defaulted to 'error'
	return (
		!!errorMessage && (
			<div className={`${style.alert} ${style[getStyleClass(type)]}`}>
				{errorMessage}
			</div>
		)
	)
}

export default ErrorMessage
