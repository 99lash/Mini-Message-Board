const db = require('../db/index');

const getMessagesQuery = async () => {
  try {
    const { rows } = await db.query('SELECT * FROM messages;')
    return rows;
  } catch (error) {
    console.error(error);
  }
}

const createMessage = async (messageDataObj) => {
  try {
    const { id, text, user, countryCode } = messageDataObj;
    await db.query('INSERT INTO messages(id, text, name, country_code) VALUES ($1, $2, $3, $4)', [id, text, user, countryCode]);
  } catch (error) {
    console.error(error);
  }
}
module.exports = {
  getMessagesQuery,
  createMessage
};

// const messages = [
//   {
//     id: crypto.randomUUID(),
//     text: "Hi there!",
//     user: "Armando",
//     countryCode: "YE",
//     added: new Date()
//   },
//   {
//     id: crypto.randomUUID(),
//     text: "Hello, World!",
//     user: "Charles",
//     countryCode: "AU",
//     added: new Date()
//   }
// ]

// module.exports = messages;