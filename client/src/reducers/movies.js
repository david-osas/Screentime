//Reducers for changing now showing, trending and platforms states in the store

export function nowShowing(state= {}, action){
  switch(action.type){
    case 'SET_NOW_SHOWING':
    return {
      ...state,
      movies: {
        ...action.movies
      }
    }
    case 'SET_TOP_SHOWING':
    return {
      ...state,
      top: [...action.movies]
    }
    default:
    return state
  }
}

export function trending(state={}, action){
  switch(action.type){
    case 'SET_TRENDING':
    return {...action.movies}

    default:
    return state
  }
}

export function platforms(state=[], action){
  switch(action.type){
    case 'SET_PLATFORMS':
    return [...action.platforms]

    default:
    return state
  }
}
