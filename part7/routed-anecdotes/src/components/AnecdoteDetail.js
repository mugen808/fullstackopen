import React from 'react'
import { useParams } from 'react-router-dom'

const NoteDetail = ({ anecdotes }) => {
  const { anecdoteId } = useParams()

  const anecdote = anecdotes.find(anecdote => anecdote.id === anecdoteId)

  if (!anecdote) return null

  return (
    <div>
      <p>{anecdote.content}</p>
      <p>Author: {anecdote.author}</p>
      <p>Info: {anecdote.info}</p>
      <p>Votes: {anecdote.votes}</p>
    </div>
  )
}

export default NoteDetail