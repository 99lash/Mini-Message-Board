const { createNewMessage, renderNewMessageForm, getMessage } = require('../controllers/messagesController');
const Router = require('express').Router;
const messagesRouter = Router();

/* 
  @route GET /messages
  @desc Get all  messages
*/
messagesRouter.get('/', (req, res) => res.redirect('/'));

/* 
  @route GET /messages/:id
  @desc Get a single message
*/
messagesRouter.get('/details/:id', getMessage);

/* 
  @route GET /messages/new
  @desc Render create a new message form page
*/
messagesRouter.get('/new', renderNewMessageForm);

/* 
  @route POST /messages/new
  @desc Create a new message and redirect to /messages
*/
messagesRouter.post('/new', createNewMessage);

module.exports = messagesRouter; 