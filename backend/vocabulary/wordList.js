const fs = require('fs');

// Read the words from the words.txt file
const words = fs.readFileSync('words_alpha.txt', 'utf-8').split('\n');

// Filter out the 5-letter words
const fiveLetterWords = words.filter(word => word.length === 5);

module.exports = fiveLetterWords;
