import React from "react"
import { useHistory } from "react-router"
import { useField } from "../hooks"

const CreateNew = (props) => {
  const {resetField: resetContent, ...content} = useField({ type: 'text' })
  const {resetField: resetAuthor, ...author} = useField({ type: 'text' })
  const {resetField: resetInfo, ...info} = useField({ type: 'text' })

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.setNotification(`New message created! '${content.value}'`)
    history.push("/")
    setTimeout(() => {
      props.setNotification('')
    }, 3000);
  }
  const resetFields = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content } />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button>create</button>
      </form>
      <button onClick={resetFields}>reset</button>
    </div>
  )

}

export default CreateNew