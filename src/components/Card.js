import React, { useState } from 'react'
import style from './Card.module.css'
import Button from './Button'
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
	const [isInfoShown, setIsInfoShown] = useState(false)
	const imgSrc = `${imageUrl}${server}/${id}_${secret}.jpg`
	const isLiked = likedItems.some((it) => it === id)

	function handleLike() {
		setLikedItems((prev) => {
			return isLiked
				? prev.filter((it) => it !== id)
				: [...new Set([...prev, id])] //To ensure no duplicate entries (by id)
		})
	}

	return (
		<li
			className={style.card}
			onMouseEnter={() => setIsInfoShown(true)}
			onMouseLeave={() => setIsInfoShown(false)}
		>
			<div
				className={style.media}
				style={{ backgroundImage: `url(${imgSrc})` }}
			/>
			{isLiked && (
				<div className={style.star}>
					<i>&#10084;</i>
				</div>
			)}
			{isInfoShown && (
				<section className={style.content}>
					<strong title={title}>{title}</strong>
					<hr />
					<em>{ownername}</em>
					<Button
						{...{
							handleLike,
							label: isLiked ? `Dislike` : `Like`,
							isActive: isLiked,
						}}
					/>
				</section>
			)}
		</li>
	)
}
export default Card
