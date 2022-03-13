const express = require('express');
let middleware=require('../middleware/setHeader')

const {createBlog, 
       saveBlog,
       allBlogs,
       getBlog
      } = require('../controllers/blogController');

const {
    loginRender,signout
       } = require('../controllers/authController');

const router = express.Router();

router.get('/login',loginRender);
router.get('/signout',signout);
router.get('/create',middleware.setHeader,middleware.decodeToken,createBlog);
router.post('/save',middleware.setHeader,middleware.decodeToken,saveBlog);
router.get('/blogs',middleware.setHeader,middleware.decodeToken,allBlogs);
router.get('/blog/:createdby',middleware.setHeader,middleware.decodeToken,getBlog);



module.exports = {
    routes: router
}