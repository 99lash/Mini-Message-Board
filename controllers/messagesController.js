// const messages = require('../models/messagesModel');
const { createMessage, getMessagesQuery } = require('../models/messagesModel');
const asyncHandler = require('express-async-handler');
const ErrorNotFound = require('../errors/CustomNotFoundError');
const { formattedMessagesFn } = require('../utils/utils');
const countries = require('../countries.json');



const getMessages = asyncHandler(async (req, res) => {
  const messages = await getMessagesQuery();
  console.log(messages);
  const formattedMessages = formattedMessagesFn(messages).sort((a, b) => Number(b.added) - Number(a.added));
  // console.log(formattedMessages)
  res.render('index', {
    title: "Mini Message Board",
    messages: formattedMessages
  });
});

const getMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const messages = await getMessagesQuery();
  const formattedMessages = formattedMessagesFn(messages);
  const formattedMessage = formattedMessages.find(message => message.id == id);

  if (!formattedMessage) {
    throw new ErrorNotFound("Message not found");
  }
  res.render('messageDetails', {
    title: 'Message Details | Mini Message Board',
    message: formattedMessage
  });
});

const renderNewMessageForm = asyncHandler(async (req, res) => {
  res.render('newMessageForm', {
    title: "New Message | Mini Message Board",
    countries: countries
  });
});

const createNewMessage = asyncHandler(async (req, res) => {
  const { author, message, countryCode } = req.body;
  // find the countryName using countryCode
  // console.log(req.body);
  const messageData = {
    id: crypto.randomUUID(),
    text: message,
    user: author,
    countryCode: countryCode,
  }

  // console.log(messageData);
  // messages.push(messageData);
  await createMessage(messageData);
  res.redirect('/messages');
});

module.exports = { getMessages, getMessage, renderNewMessageForm, createNewMessage }