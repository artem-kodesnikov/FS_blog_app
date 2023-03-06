const User = require('../models/User');
const Post = require('../models/Post');

class userController {
  async updateUserName(req, res) {
    try {
      const { id } = req.params
      const { username } = req.body
      const candidate = await User.findOne({ username })

      if (candidate) {
        return res.status(400).json({message: `User ${username} already registered`})
      }

      await User.updateOne({_id: id}, {username: username})
      res.status(200).json({ message: 'Username updated'})
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Update error'})
    }
  }

  async updateDisplayName(req, res) {
    try {
      const { id } = req.params
      const { displayname } = req.body
      const candidate = await User.findOne({ displayname })
      const updatedUser = await User.findByIdAndUpdate(id, { displayname: displayname });

      if (candidate) {
        return res.status(400).json({message: `Displayname ${displayname} already registered`})
      }
      
      const updateUser = await User.updateOne({_id: id}, {displayname: displayname})
      const updatePosts = await Post.updateMany({user: updatedUser.displayname}, {user: displayname})

      await Promise.all([updateUser, updatePosts])

      res.status(200).json({ message: 'Displayname updated'})
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Update error'})
    }
  }
}

module.exports = new userController();