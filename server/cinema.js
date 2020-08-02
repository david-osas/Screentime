const cinemasList = ['Exodus','Goldenbird','Light Tower','Sphere','Arena','Imperial', 'Moviehouse','Star','Movie Rocket','Movie Map']

function getCinemas(){
  const num = Math.floor(Math.random() * 10) + 1
  var cinemas = new Set()
  var prices = []

  while(cinemas.size < num){
    var index = Math.floor(Math.random() * 10)
    cinemas.add(cinemasList[index])
  }
  for(var i = 0; i < num; i++){
    prices.push(Math.floor(Math.random() * 8) + 8)
  }

  return {cinemas: [...cinemas], prices}
}

exports.getCinemas = getCinemas
