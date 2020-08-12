//action creator to set application loading state

export function loading(value){
  return {
    type: 'SET_LOADING',
    loading: value
  }
}
