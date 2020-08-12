//action creator to set news state in the store

function addNews(articles){
  return {
    type: 'SET_NEWS',
    articles
  }
}


export function setNews(){
  return(dispatch) => {
    return fetch('/server/top-news', {credentials: 'same-origin'})
          .then((res) => res.json())
          .then((resJson) => {
            dispatch(addNews(resJson))
          })
  }
}
