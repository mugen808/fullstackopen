const initialFilter = {
  filter: ''
}

export const applyFilter = (filter) => {
  return {
    type: '@filter/apply',
    payload: {
      filter
    }
  }
}

const filterReducer = (state = initialFilter, action) => {
  switch(action.type) {
    case '@filter/apply':
      return { ...initialFilter, filter: action.payload.filter }
  }
  return state
}

export default filterReducer