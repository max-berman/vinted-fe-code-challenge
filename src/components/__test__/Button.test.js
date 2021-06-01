import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Button from '../Button'

const defaultProps = {
	label: 'Like',
	handleLike: jest.fn(),
}

test('button renders with correct label', () => {
	const { queryByText, rerender } = render(<Button {...defaultProps} />)
	expect(queryByText('Like')).toBeTruthy()

	// Change props
	rerender(<Button {...defaultProps} label='Dislike' />)
	expect(queryByText('Dislike')).toBeTruthy()
})

test('calls correct function on click', () => {
	const { handleLike, label } = defaultProps
	const { getByText } = render(
		<Button {...defaultProps} onClick={handleLike} />
	)
	fireEvent.click(getByText(label))
	expect(handleLike).toHaveBeenCalled()
})
