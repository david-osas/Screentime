export function authed(state=false, action){
  switch(action.type){
    case 'SET_AUTHED':
    return action.value

    default:
    return state
  }
}
