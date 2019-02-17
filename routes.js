const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')
const database = require('./database')
const passport = require('./passport')

const userHandler = require('./handlers/user')
const challengesHandler = require('./handlers/challenges')
const challengeHandler = require('./handlers/challenge')
const solveChallengeHandler = require('./handlers/solveChallenge')
const addChallengeHandler = require('./handlers/addChallenge')

// generic route handler
const genericHandler = (req, res, next) => {
    res.json({
        status: 'success',
        data: req.body
    });
};

function isUserAuthenticated(req, res, next) {
  if (req.user) {
  next()
  } else {
    res.status(401).json({error: 'not logged in!'})
  }
}

router.get('/', isUserAuthenticated, (req, res) => {
    console.log('tests')
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) { return res.redirect(303, '/login?message=' + info.message) }
    req.logIn(user, (err) => {
      if (err) { return next(err) }
      return res.redirect(303, '/')
    })
  })(req, res, next)
})

router.get('/logout', (req, res) => {
  if (req.logout) {
    req.logout()
  }
  res.redirect('/')
})

router.get('/api/user', userHandler)

router.get('/api/challenges', isUserAuthenticated, challengesHandler)

router.get('/api/challenge/:id', isUserAuthenticated, challengeHandler)

router.post('/api/submit', isUserAuthenticated,solveChallengeHandler)

router.post("/api/addChallenge", isUserAuthenticated, addChallengeHandler)

module.exports = router;