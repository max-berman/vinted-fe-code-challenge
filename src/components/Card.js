import React, { useState, useEffect } from 'react'
import s from './Card.module.css'
import API from '../configData.json'
const { imageUrl } = API

function Card({ id, title, secret, server, ownername }) {
	const [isShown, setIsShown] = useState(false)
	const [isLiked, setIsLiked] = useState(false)
	const imgSrc = `${imageUrl}${server}/${id}_${secret}.jpg`

	const btnClasses = isLiked ? `${s.action} ${s.liked}` : s.action

	function handleFavorite() {
		console.log('hey')
		setIsLiked((prev) => !prev)
	}

	return (
		<li
			className={s.card}
			onMouseEnter={() => setIsShown(true)}
			onMouseLeave={() => setIsShown(false)}
		>
			<div className={s.media} style={{ backgroundImage: `url(${imgSrc})` }} />
			{isLiked && (
				<div className={s.star}>
					<i>&#9733;</i>
				</div>
			)}

			{isShown && (
				<section className={s.content}>
					<strong title={title}>{title}</strong>
					<hr />
					<em>{ownername}</em>
					<button className={btnClasses} onClick={handleFavorite}>
						{isLiked ? `Dislike` : `Like`}
					</button>
				</section>
			)}
		</li>
	)
}
export default Card
