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
      results.current = await Post.find().limit(limit).skip(startIndex).exec();
      res.send(results);
    } catch (e) {
      res.status(400).json({ message: 'Pagination error'})
    }
  }
}

module.exports = new postController();