import { newAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { newNotification } from '../reducers/notificationReducer'


const Form = (props) => {

  const addNew = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    props.newAnecdote(content)
    props.newNotification(`New message: '${content}'`, 3, props.timeout)

  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <input name='anecdote'/>
        <button>create</button>
      </form>
    </div>
  )
}

const mapToStateProps = (state) => {
  return { timeout: state.notifications.timeout }
}

const mapToDisPatchProps = {
  newAnecdote,
  newNotification
}

const ConnectedForm = connect(mapToStateProps, mapToDisPatchProps)(Form)
export default ConnectedForm