import React, { useState } from 'react'
import s from './Card.module.css'
import API from '../configData.json'
const { imageUrl } = API

function Card({
	id,
	title,
	secret,
	server,
	ownername,
	setLikedItems,
	likedItems,
}) {
	const [isMetaShown, setIsMetaShown] = useState(false)
	const imgSrc = `${imageUrl}${server}/${id}_${secret}.jpg`
	const isLiked = likedItems.some((it) => it === id)
	const btnClasses = isLiked ? `${s.action} ${s.liked}` : s.action

	function handleLike() {
		setLikedItems((prev) => {
			return isLiked
				? prev.filter((it) => it !== id)
				: [...new Set([...prev, id])] //To ensure no duplicate entries (by id)
		})
	}

	return (
		<li
			className={s.card}
			onMouseEnter={() => setIsMetaShown(true)}
			onMouseLeave={() => setIsMetaShown(false)}
		>
			<div className={s.media} style={{ backgroundImage: `url(${imgSrc})` }} />
			{isLiked && (
				<div className={s.star}>
					<i>&#10084;</i>
				</div>
			)}
			{isMetaShown && (
				<section className={s.content}>
					<strong title={title}>{title}</strong>
					<hr />
					<em>{ownername}</em>
					<button className={btnClasses} onClick={handleLike}>
						{isLiked ? `Dislike` : `Like`}
					</button>
				</section>
			)}
		</li>
	)
}
export default Card
