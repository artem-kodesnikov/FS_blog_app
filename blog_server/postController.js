const Post = require('./models/Post');

class postController {
  async getPosts(req, res) {
    try {
      const posts = await Post.find();
      res.send(posts);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Posts error'})
    }
  }

  async postById(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      res.send(post);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Post error'})
    }
  }

  async createPost(req, res) {
    try {
      const { title, content } = req.body;
      const post = new Post({ title, content });
      await post.save();
      res.status(201).json({message: 'Post created'});
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Post error'})
    }
  }
}

module.exports = new postController();