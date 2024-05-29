/* eslint-disable camelcase */
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function register(req, res) {
  const { username, email, first_name, last_name, password, password_confirm } = req.body

  if (!username || !email || !password || !password_confirm || !first_name || !last_name) {
    return res.status(422).json({ 'message': 'Invalid fields' })
  }
  if (password !== password_confirm) {
    return res.status(422).json({ 'message': 'Passwords do not match' })
  }

  try {
    const userExists = await User.exists({ email }).exec()

    if (userExists) {
      return res.status(409).json({ 'message': 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({ email, username, password: hashedPassword, first_name, last_name })

    return res.sendStatus(201)
  } catch (error) {
    return res.status(500).json({ 'message': error.message })
  }
}

async function login(req, res) {
  const { email, password } = req.body

  if (!email || !password) return res.status(422).json({ 'message': 'Invalid fields' })
  const user = await User.findOne({ email })

  if (!user) return res.status(401).json({ 'message': 'Email or password is incorrct' })
  const match = await bcrypt.match(password, user.password)

  if (!match) return res.status(401).json({ 'message': 'Email or password is incorrect' })

  const accessToken = jwt.sign({
    username: user.username,
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: '1800s',
  },
  )

  const refreshToken = jwt.sign({
    username: user.username,
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn: '1d',
  },
  )

  user.refresh_token = refreshToken
  await user.save()
  res.cookie('refresh_token', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
  res.json({ access_token: accessToken })

}

async function logout(req, res) {
  res.sendStatus(200)
}

async function refresh(req, res) {
  res.sendStatus(200)
}

async function user(req, res) {
  res.sendStatus(200)
}

module.exports = { register, login, logout, refresh, user }
