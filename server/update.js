const {dropCollections, setData, setUpdate} = require('./database')


function isUpdating(req, res, next){
  if(update){
    console.log('waiting for update')
    setTimeout(isUpdating, 3000)
  }else{
    next()
  }
}

function startUpdate(){
  console.log('Update is starting')
  setUpdate()

  dropCollections()

  setData()
}


exports.isUpdating = isUpdating
exports.runUpdate = () => setInterval(startUpdate, 2 * 60 * 1000)
