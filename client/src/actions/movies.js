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
    return fetch('http://localhost:5000/server/movies/'+pageId)
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
    return fetch('http://localhost:5000/server/popular-movies')
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
