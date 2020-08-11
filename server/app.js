//jshint esversion: 6
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const saltRounds = 10

const {session, sess, Movie, Popular, Showing, User, Genre, Article, isUpdating, runUpdate} = require('./database')
const {getCinemas} = require('./cinema')
const {isAuthenticated} = require('./middleware')
const {platforms} = require('./streamingPlatforms')
const {getTrailer} = require('./api')

const app = express()

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sess.cookie.secure = true
}

app.use(express.json(), cors({credentials: true, origin: true}), session(sess), isUpdating)


app.get('/server/top-news', (req, res) => {
  Article.find({}, (err, results) => {
    if (!err) {
      res.json(results)
    } else {
      console.log(err)
    }
  })
})

app.get('/server/page-numbers', (req, res) => {
  Showing.findOne({}, (err, results) => {
    var total = results.totalMovies

    var nums
    if (!err) {
      nums = Math.floor(total / 16)
      if (total % 16 > 0) {
        nums++
      }
      res.json({num: nums})
    } else {
      console.log(err)

    }
  })
})

app.get('/server/cinemas', (req, res) => {
  res.json(getCinemas())
})

app.post('/server/genre',async (req, res) => {
  let genres = []
  if(req.body.genre.length > 0){
    for(let g of req.body.genre){
      await  Genre.findOne({id: g}, (err, results) => {
          genres = [...genres, results.name]
        })
    }
  }
  res.json({genres})
})



app.get('/server/trailer/:id', async (req, res) => {
  let key = await getTrailer(req.params.id)
  return res.json({key})
})

app.post('/server/search-movie', (req, res) => {

  Movie.findOne({
    title: req.body.movie.toLowerCase()
  }, (err, result) => {
    if (!err) {
      if(result){
        res.json({result})
      }else{
        res.json({feedBack: 'failure'})
      }
    } else {
      console.log(err)
    }
  })
})



app.get('/server/movies/:pageId', (req, res) => {
  var page = req.params.pageId
  var size = (page - 1) * 16

  Movie.find({}, null, {
    skip: size,
    limit: 16
  }, (err, results) => {
    if (!err) {
      res.json(results)
    } else {
      console.log(err)
    }
  })
})

app.get('/server/popular-movies', (req, res) => {
  Popular.find({}, (err, results) => {
    if (!err) {
      res.json({popularMovies: results, platforms})
    } else {
      console.log(err)
    }
  })

})

app.post('/server/signup', async (req, res) => {
  let name = false
  let mail = false
  await User.findOne({
    username: req.body.username
  }, (err, results) => {
    if (!err && results) {
      name = true
    }
  })

  await User.findOne({
    email: req.body.email
  }, (err, results) => {
    if (!err && results) {
      mail = true
    }
  })

  if (name && mail) {
    return res.json({feedBack: 'both'})
  } else if (name) {
    return res.json({feedBack: 'username'})
  } else if (mail) {
    return res.json({feedBack: 'email'})
  }

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (!err) {
      const newUser = new User({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        liked: [],
        history: [],
        subscribed: []
      })
      newUser.save((err) => {
        if (!err) {
          req.session.user = req.body.email
          return res.json({feedBack: 'success'})
        } else {
          console.log(err)
          return res.json({feedBack: 'failure'})
        }
      })
    } else {
      console.log(err)
      return res.json({feedBack: 'failure'})
    }

  })
})

app.post('/server/login', (req, res) => {

  User.findOne({
    email: req.body.email
  }, (err, results) => {
    if (!err && results) {
      bcrypt.compare(req.body.password, results.password, (err, comp) => {
        if (comp) {
          req.session.user = req.body.email
          return res.json({feedBack: 'success'})
        } else {
          return res.json({feedBack: 'password'})
        }
      })
    } else {
      return res.json({feedBack: 'email'})
    }
  })

})

app.get('/server/get-user', (req, res) => {

  if(req.session.user){
    User.findOne({
      email: req.session.user
    }, (err, results) => {
      if(!err && results) {
        res.json({username: results.username, email: results.email, feedBack: 'success'})
      }
    })
  }else{
    res.json({feedBack: 'failure'})
  }
})

app.delete('/server/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({feedBack: 'logged out'})
  })
})



app.get('/*', (req, res) => {
  res.send('welcome home')
})


app.listen(5000, () => {
  console.log('server started on port 5000')
  // let intervaleObj = runUpdate()
  // setTimeout(() => {
  //   clearInterval(intervaleObj)
  //   console.log('Updating has stopped')
  // }, 5 * 60 * 1000)
})
