import {readText} from "./io.js";
import {cleanText} from "./utils.js";
import {buildMarkovChain, generateNextChars, completeWord} from "./markov.js";

const text = readText('./data/compte-de-montecristo.txt');
const cleanedText = cleanText(
    text,
    '*** START OF THE PROJECT GUTENBERG EBOOK LE COMTE DE MONTE-CRISTO, TOME I ***',
    '*** END OF THE PROJECT GUTENBERG EBOOK LE COMTE DE MONTE-CRISTO, TOME I ***',
);
const order = 10;
const markovChain = buildMarkovChain(cleanedText, order);
const generatedText = generateNextChars(markovChain, 'bonjour je suis ', 100, order);
const completedWord = completeWord(markovChain, 'vous êtes un g', order);

console.log(generatedText);
console.log(completedWord);