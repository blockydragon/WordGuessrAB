const fs = require('fs');
const path = require('path');

// Read the words from the words.txt file
const words = fs.readFileSync(path.join(__dirname,'./words_alpha.txt'), 'utf-8').replace(/\r\n/g, '\n').split('\n');

// Filter out the 5-letter words
const fiveLetterWords = words.filter(word => word.length === 5);

module.exports = fiveLetterWords;
