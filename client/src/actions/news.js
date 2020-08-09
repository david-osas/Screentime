function addNews(articles){
  return {
    type: 'SET_NEWS',
    articles
  }
}


export function setNews(){
  return(dispatch) => {
    return fetch('http://localhost:5000/server/top-news')
          .then((res) => res.json())
          .then((resJson) => {            
            dispatch(addNews(resJson))
          })
  }
}
