import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const handleClick = (e) => {
    const button = e.target.innerHTML
    if (button === 'good') {
      store.dispatch({
        type: 'GOOD'
      })
    }
    if (button === 'neutral') {
      store.dispatch({
        type: 'OK'
      })
    }
    if (button === 'bad') {
      store.dispatch({
        type: 'BAD'
      })
    }
    if (button === 'reset stats') {
      store.dispatch({
        type: 'ZERO'
      })
    }
  }
  return (
    <div>
      <button onClick={handleClick}>good</button>
      <button onClick={handleClick}>neutral</button>
      <button onClick={handleClick}>bad</button>
      <button onClick={handleClick}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)