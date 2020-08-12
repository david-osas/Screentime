//action creators to set now showing movies, trending movies and streaming platforms states in the store

function addNowShowing(movies){
  return {
    type: 'SET_NOW_SHOWING',
    movies
  }
}
function addTopShowing(movies){
  return {
    type: 'SET_TOP_SHOWING',
    movies
  }
}

function addTrending(movies){
  return {
    type: 'SET_TRENDING',
    movies
  }
}

function addPlatforms(platforms){
  return {
    type: 'SET_PLATFORMS',
    platforms
  }
}

export function setNowShowing(pageId){
  return(dispatch) => {
    return fetch('/server/movies/'+pageId, {credentials: 'same-origin'})
          .then((res) => res.json())
          .then((resJson) => {
            let movies = {}
            resJson.forEach((item) => {
              movies[item.id] = item
            })
            dispatch(addNowShowing(movies))
            if(pageId === 1){
              dispatch(addTopShowing(resJson.splice(0,8)))
            }
          })
  }
}

export function setTrending(){
  return(dispatch) => {
    return fetch('/server/popular-movies', {credentials: 'same-origin'})
          .then((res) => res.json())
          .then((resJson) => {
            let movies = {}
            resJson.popularMovies.forEach((item) => {
              movies[item.id] = item
            })
            dispatch(addTrending(movies))
            dispatch(addPlatforms(resJson.platforms))
          })
  }
}
