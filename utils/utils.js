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

module.exports = { formattedMessagesFn };