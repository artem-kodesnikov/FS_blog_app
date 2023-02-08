const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('./config')

const generateAccesToken = (id) => {
  const payload = {
    id,
  }
  return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class authController {
  async registration(req, res) {
    try {
      const { username, displayname, password } = req.body
      const candidate = awaitUser.findOne({username})
      if (candidate) {
        return res.status(400).json({message: 'User already registered'})
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({ username, displayname, password: hashPassword })
      await user.save()
      return res.status(201).json({message: 'User created'})
    } catch (e) {
      res.status(400).json({message: 'Registration error'})
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username })
      if (!user) {
        return res.status(400).json({message: `User ${username} not found`})
      }
      const isValidPassword = bcrypt.compareSync(password, user.password)
      if (!isValidPassword) {
        res.status(400).json({ message: 'Password is not valid'})
      }
      req.session.authenticated = true;
      req.session.user = { username, password }
      const token = generateAccesToken(user._id)
      return res.status(201).json({token, user})
    } catch (e) {
      res.status(400).json({message: 'Login error'})
    }
  }
  async logout(req, res) {
    try {
      if (req.session) {
        req.session.destroy(err => {
          if (err) {
            res.status(400).send('Unable to logout')
          } else {
            res.send('Logout successful')
          }
        });
      }
    } catch (e) {
      res.status(400).json({message: 'Logout error'})
    }
  }
}

module.exports = new authController()