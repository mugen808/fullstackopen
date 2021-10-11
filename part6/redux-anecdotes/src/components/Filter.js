import React from 'react'
import { connect } from 'react-redux' 
import { applyFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (e) => {
    props.applyFilter(e.target.value)
  }
  return (
    <div>
      Filter: 
      <input type="text" name='filter' onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  applyFilter
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter