import React from 'react'
import { useDispatch } from 'react-redux' 
import { applyFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (e) => {
    dispatch(applyFilter(e.target.value))
  }
  return (
    <div>
      Filter: 
      <input type="text" name='filter' onChange={handleChange} />
    </div>
  )
}

export default Filter