import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'



test('blogform is submitted with the right details', () => {
  const mockSubmit = jest.fn(mock => {
    const formField = {
      title: component.container.querySelector('#title').value,
      author: component.container.querySelector('#author').value,
      url: component.container.querySelector('#url').value
    }
    return formField
  })

  const component = render(
    <BlogForm />
  )

  const button = component.getByText('Show Fields')
  fireEvent.click(button)

  const blogForm = component.container.querySelector('#blogForm')
  const authorField = component.container.querySelector('#author')
  const titleField = component.container.querySelector('#title')
  const urlField = component.container.querySelector('#url')
  authorField.value = 'Test Author'
  titleField.value = 'Test Title'
  urlField.value = 'http://urltest.com'
  blogForm.onsubmit = mockSubmit

  const submitButton = component.getByText('Create a new blog')
  fireEvent.click(submitButton)

  expect(mockSubmit).toHaveBeenCalled()
  expect(mockSubmit.mock.calls).toHaveLength(1)
  expect(mockSubmit.mock.results[0].value.author).toBe('Test Author')
})