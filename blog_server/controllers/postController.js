const Post = require('../models/Post');

class postController {
  async getPosts(req, res) {
    try {
      const posts = await Post.find().sort({ date: -1 });
      res.send(posts);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Posts error' })
    }
  }

  async createPost(req, res) {
    try {
      const { title, content, user, url } = req.body;
      const post = new Post({ title, content, user, url });
      await post.save();
      res.send(post);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Post error' })
    }
  }

  async deletePost(req, res) {
    try {
      const { dataForDeleting } = req.body;
      const { _id, userDisplayname} = dataForDeleting;
      const userPost = await Post.findOne({_id})
      if (userPost.user !== userDisplayname) {
        return res.status(400).json({message: 'It isn\'t your post'})
      }
      const post = await Post.findByIdAndDelete(_id);
      res.status(200).send(post);
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Delete error' })
    }
  }

  async postPagination(req, res) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    if (endIndex < await Post.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      };
    }
    try {
      results.current = await Post.find().sort({ date: -1 }).limit(limit).skip(startIndex).exec();
      res.send(results);
    } catch (e) {
      res.status(400).json({ message: 'Pagination error' })
    }
  }
}

module.exports = new postController();