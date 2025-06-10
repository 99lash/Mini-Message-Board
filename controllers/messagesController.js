const messages = require('../models/messagesModel');
const asyncHandler = require('express-async-handler');
const ErrorNotFound = require('../errors/CustomNotFoundError');
const countries = require('../countries.json');

function formatDateToMMDDYYYY(date) {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

function getCountryName(code) {
  return countries.find(c => c.code === code).name
}

const formattedMessagesFn = () => {
  return messages.map(msg => (
    {
      ...msg,
      formattedDate: formatDateToMMDDYYYY(new Date(msg.added)),
      countryName: getCountryName(msg.countryCode)
    }
  ));
}

const getMessages = asyncHandler(async (req, res) => {
  const formattedMessages = formattedMessagesFn().sort((a, b) => Number(b.added)-Number(a.added));
  console.log(formattedMessages)
  res.render('index', {
    title: "Mini Message Board",
    messages: formattedMessages
  });
});

const getMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const formattedMessages = formattedMessagesFn();
  const formattedMessage = formattedMessages.find(message => message.id == id);

  if (!formattedMessage) {
    throw new ErrorNotFound("Message not found");
  }
  res.render('messageDetails.ejs', {
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
  console.log(req.body);
  const messageData = {
    id: crypto.randomUUID(),
    text: message,
    user: author,
    countryCode: countryCode,
    added: new Date()
  }

  // console.log(messageData);
  messages.push(messageData);
  res.redirect('/messages');
});

module.exports = { getMessages, getMessage, renderNewMessageForm, createNewMessage }