const { getMessages } = require('../controllers/messagesController');
const ErrorNotFound = require('../errors/CustomNotFoundError');
const Router = require('express').Router;
const indexRouter = Router();

/* 
  @route GET /
  @desc Render index/home page and display messages
*/
indexRouter.get('/', getMessages);
indexRouter.use((err ,req ,res) => {
  throw new ErrorNotFound('Page not found');
})

module.exports = indexRouter;