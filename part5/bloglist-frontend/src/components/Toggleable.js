import React, { useState, useImperativeHandle, forwardRef } from 'react'

const Toggleable = forwardRef(({ children, ...props }, ref) => {
  const [visible, setVisible] = useState(false)
  const show = { display: visible ? '' : 'none'}
  const hide = { display: visible ? 'none' : ''}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  return (
    <div>
      <div style={show}>
        {children}
        <button onClick={toggleVisibility}>Hide {props.buttonLabel}</button>
      </div>
      <div>
        <button style={hide} onClick={toggleVisibility}>Show {props.buttonLabel}</button>
      </div>
    </div>
  )
})

export default Toggleable