const messages = [
  {
    id: crypto.randomUUID(),
    text: "Hi there!",
    user: "Armando",
    countryCode: "YE",
    added: new Date()
  },
  {
    id: crypto.randomUUID(),
    text: "Hello, World!",
    user: "Charles",
    countryCode: "AU",
    added: new Date()
  }
]

module.exports = messages;