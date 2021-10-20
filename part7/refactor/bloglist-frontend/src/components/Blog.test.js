import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Johnny B',
  url: 'http://url.com',
  likes: 0,
  user: {
    username: 'kalanai',
    name: 'Kali Olino',
    token: 'suhaushaushausha'
  }
}

const user = {
  username: 'kalanai',
  name: 'Kali Olino',
  token: 'su112hau21shau12shau1sha'
}

test('renders content', () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )
  // const p = component.container.querySelector('p')
  // console.log(prettyDOM(p))
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('bloglist displays initially only author and title', () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )

  const author = component.getByText('by:')
  const title = component.getByText('Title:')
  const div = component.container.querySelector('.togglableContent')
  expect(author).not.toHaveStyle('display: none')
  expect(title).not.toHaveStyle('display: none')
  expect(div).toHaveStyle('display: none')
})

test('details of the blog are shown when button is clicked', () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )
  const button = component.getByText('Show Details')
  fireEvent.click(button)
  const div = component.container.querySelector('.togglableContent')
  expect(div).not.toHaveStyle('details: none')
})

test('Like button is triggered twice when clicked 2 times', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} user={user} handleLike={mockHandler}/>
  )
  const showButton = component.getByText('Show Details')
  fireEvent.click(showButton)
  const likeButton = component.getByText('Like')
  likeButton.onclick = mockHandler
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})