import React from 'react'
import style from './Button.module.css'

function Button({ handleLike, label, isActive }) {
	const btnClass = isActive ? `${style.button} ${style.active}` : style.button
	return (
		<button className={btnClass} onClick={handleLike}>
			{label}
		</button>
	)
}

export default Button
