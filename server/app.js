//jshint esversion: 6
const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const saltRounds = 10

const {session, sess, Movie, Popular, Showing, User, Genre, Article, setData} = require('./database')
const {getCinemas} = require('./cinema')
const {isAuthenticated} = require('./middleware')
const {platforms} = require('./streamingPlatforms')
const {isUpdating, runUpdate} = require('./update')

const app = express()

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sess.cookie.secure = true
}

//, isAuthenticated
app.use(bodyParser.urlencoded({extended: true}), session(sess))



app.get('/top-news', (req, res) => {
  Article.find({}, (err, results) => {
    if (!err) {
      res.json({results})
    } else {
      console.log(err)
    }
  })
})

app.get('/page-numbers', (req, res) => {
  Showing.findOne({}, (err, results) => {
    var total = results.totalMovies

    var nums
    if (!err) {
      nums = Math.floor(total / 16)
      if (total % 16 > 0) {
        nums++
      }
      res.json({num: nums.toString()})
    } else {
      console.log(err)

    }
  })
})

app.get('/cinemas', (req, res) => {
  res.json({cinemas: getCinemas()})
})

app.get('/genre-list', (req, res) => {
  Genre.find({}, (err, results) => {
    res.json({results})
  })
})

app.patch('/subscribe', (req, res) => {
  User.findOne({
    email: req.session.user
  }, (err, results) => {
    if (!err) {
      if (results.subscribed.length >= 5) {
        return res.send('failure')
      } else {
        results.subscribed.push(req.body.genreId)
        results.save()
        return res.send('success')
      }

    } else {
      console.log(err)
    }
  })
})

app.patch('/unsubscribe', (req, res) => {
  User.findOne({
    email: req.session.user
  }, (err, results) => {
    if (!err) {
      results.subscribed = results.subscribed.filter(s => s !== req.body.genreId)
      results.save()
      return res.send('success')
    } else {
      console.log(err)
    }
  })
})

app.get('/search-movie', (req, res) => {

  Movie.findOne({
    title: req.body.movie.toLowerCase()
  }, (err, results) => {
    if (!err) {
      if(results){
        res.json({results})
      }else{
        res.send('failure')
      }
    } else {
      console.log(err)
    }
  })
})

app.patch('/like-movie', (req, res) => {
  User.findOneAndUpdate({
    email: req.session.user
  }, {
    $addToSet: {
      liked: req.body.movieId
    }
  }, (err, results) => {
    if (!err) {
      res.send('success')
    } else {
      console.log(err)
    }
  })
})

app.patch('/unlike-movie', (req, res) => {
  User.findOne({
    email: req.session.user
  }, (err, results) => {
    if (!err) {
      results.liked = results.liked.filter(s => s !== req.body.movieId)
      results.save()
      res.send('success')
    } else {
      console.log(err)
    }
  })
})

app.patch('/add-to-watchlist', (req, res) => {
  User.findOneAndUpdate({
    email: req.session.user
  }, {
    $addToSet: {
      watchlist: req.body.movieId
    }
  }, (err, results) => {
    if (!err) {
      res.send('success')
    } else {
      console.log(err)
    }
  })
})

app.patch('/remove-from-watchlist', (req, res) => {
  User.findOne({
    email: req.session.user
  }, (err, results) => {
    if (!err) {
      results.watchlist = results.watchlist.filter(s => s !== req.body.movieId)
      results.save()
      res.send('success')
    } else {
      console.log(err)
    }
  })
})

app.get('/movies/:pageId', (req, res) => {
  var page = req.params.pageId
  var size = (page - 1) * 16

  Movie.find({}, null, {
    skip: size,
    limit: 16
  }, (err, results) => {
    if (!err) {
      res.json({results})
    } else {
      console.log(err)
    }
  })
})

app.get('/popular-movies', (req, res) => {
  Popular.find({}, (err, results) => {
    if (!err) {
      res.json({popularMovies: results, platforms})
    } else {
      console.log(err)
    }
  })

})

app.post('/signup', async (req, res) => {
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
    return res.send('both')
  } else if (name) {
    return res.send('username')
  } else if (mail) {
    return res.send('email')
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
          return res.send('success')
        } else {
          console.log(err)
          return res.send('failure')
        }
      })
    } else {
      console.log(err)
      return res.send('failure')
    }

  })
})

app.post('/login', (req, res) => {

  User.findOne({
    email: req.body.email
  }, (err, results) => {
    if (!err && results) {
      bcrypt.compare(req.body.password, results.password, (err, comp) => {
        if (comp) {
          req.session.user = req.body.email
          return res.send({username: results.username, liked: results.liked, history: results.history, subscribed: results.subscribed})
        } else {
          return res.send('password')
        }
      })
    } else {
      return res.send('email')
    }
  })

})

app.delete('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send('user logged out')
  })
})

app.get('/checking', (req, res) => {
  if (req.session.user) {
    res.send('you are signed in bro')
  } else {
    res.send('get the hell outta here')
  }
})
app.get('/register', (req, res) => {
  console.log('i got here')
  res.send('login')
})

app.get('/*', (req, res) => {
  res.send('welcome home')
})

//setData()
app.listen(5000, () => {
  console.log('server started on port 5000')
  let intervaleObj = runUpdate()
  setTimeout(() => {
    clearInterval(intervaleObj)
    console.log('Updating has stopped')
  }, 10 * 60 * 1000)
})
