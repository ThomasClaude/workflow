const Barba = require('barba.js');

document.addEventListener('DOMContentLoaded', () => {
  const authorSite = 'http://thomasclaude.be';

  console.info(`✌️ This website was made by ${authorSite} ✌️ `);

  Barba.Pjax.start();
});
