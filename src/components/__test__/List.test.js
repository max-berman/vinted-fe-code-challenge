import React from 'react'
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react'
import List from '../List'

afterEach(cleanup)

test('should not render List on start', () => {
	const { queryByTestId } = render(<List />)
	expect(queryByTestId('fetch-list')).toBeNull()
})
test('should show Loader on start', () => {
	const { queryByTestId } = render(<List />)
	expect(queryByTestId('loader').textContent).toBe('Fetching photos ...')
})
