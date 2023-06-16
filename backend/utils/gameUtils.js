const crypto = require('crypto');

const challenges = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  // ... add as many challenges as you'd like
];

function generateGameCode() {
  // Generate a 6-character alphanumeric game code
  return crypto.randomBytes(3).toString('hex').toUpperCase();
}

function generateChallenge() {
  // Randomly select a challenge from the array
  const index = Math.floor(Math.random() * challenges.length);
  return challenges[index];
}

module.exports = { generateGameCode, generateChallenge };
