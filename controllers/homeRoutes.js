const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// home page, shows all blogs
router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get individual blog
router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      include: [{ model: Comment }],
    });

    // Serialize data so the template can read it
    const blog = blogData.get({ plain: true });

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// get user for dashboard
// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    // Serialize data so the template can read it
    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// redirect login if logged in
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// create blog route
// Use withAuth middleware to prevent access to route
router.get('/blogpost', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    // Serialize data so the template can read it
    const user = userData.get({ plain: true });

    res.render('blogpost', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// view, edit, delete blog route
// Use withAuth middleware to prevent access to route
router.get('/blog', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    // Serialize data so the template can read it
    const user = userData.get({ plain: true });

    res.render('blog', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// create commentpost route
// Use withAuth middleware to prevent access to route
router.get('/commentpost/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    // Serialize data so the template can read it
    const user = userData.get({ plain: true });

    // get current blog data
    const blogData = await Blog.findOne({ 
      where: { id: req.params.id }
    });

    // Serialize data so the template can read it
    const blog = blogData.get({ plain: true });

    res.render('commentpost', {
      user,
      blog,
      logged_in: true
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
