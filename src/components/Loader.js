import React from 'react'
import style from './Loader.module.css'

function Loader({ loadingText, isFetching }) {
	return !isFetching && <div className={style.loader}>{loadingText}</div>
}

export default Loader
