import {range} from "./utils.js";

export const buildMarkovChain = (text, order = 1) => {

    if (typeof text !== 'string') throw new TypeError('text doit être un "string"');
    if (!Number.isInteger(order)) throw new TypeError('order doit être un "int"');
    if (order < 1) throw new RangeError('order doit être strictement supérieur à zéro');

    const mapLength = text.length - order + 1;
    if (mapLength <= 0) throw new RangeError(`order doit être inférieur à ${text.length + 1}`);

    const markovChain = new Map();

    for (let i = 0; i < mapLength; i++) {

        const key = text.slice(i, i + order);
        const nextChar = text[i + order] ?? '';

        const entry = markovChain.get(key) ?? {};
        entry[nextChar] = (entry[nextChar] ?? 0) + 1;

        markovChain.set(key, entry);
    }

    return markovChain;

    // Version purement fonctionnelle mais des performance moindres
    /*
    return range(0, mapLength)
        .reduce((markovChain, i) => {

            const key = text.slice(i, i + order);
            const nextChar = text[i + order];

            const entry = markovChain.get(key) ?? {};
            const newEntry = {
                ...entry,
                [nextChar] : (entry[nextChar] ?? 0) + 1
            }

            return new Map([
                ...markovChain,
                [key, newEntry]
            ]);
        }, new Map());
    */
}

export const generateNextChar = (markovChain, userInput, order) => {

    if (!markovChain.has(userInput.slice(-order))) return '';

    const transitions = Object.entries(markovChain.get(userInput.slice(-order)));

    const sum = transitions.reduce(
        (accumulator, currentValue) => {
            return accumulator + currentValue[1];
        }, 0);

    const randomProb = Math.random() * sum;

    return transitions
        .map(([key, value], index, array) => {
            return [
                key,
                array.slice(0, index + 1)
                    .map(element => element[1])
                    .reduce((accumulator, currentValue) => accumulator + currentValue)
            ];
        }).filter(value => value[1] > randomProb)[0][0];
}

export const generateNextChars = (markovChain, userInput, n, order) => {

    if (!Number.isInteger(order) && n < 1) throw new Error('order doit être un "int" supérieur à 1');

    if (typeof userInput !== 'string') throw new TypeError('userInput doit être un "string"');
    if (userInput.length < order) throw new RangeError(`userInput doit être au minimum de longueur ${order}`);
    if (!markovChain.has(userInput.slice(-order))) throw Error(`${userInput} n'est pas contenu dans markovChain`);

    if (!Number.isInteger(n) && n < 1) throw new Error('n doit être un "int" supérieur à 1');

    return range(0, n).reduce(accumulator => {

        const nextChar = generateNextChar(markovChain, accumulator.slice(-order));
        if (nextChar === '') return accumulator;

        return accumulator + nextChar;
    }, userInput);
}

export const completeWord = (markovChain, userInput, order) => {

    if (!Number.isInteger(order) && n < 1) throw new Error('order doit être un "int" supérieur à 1');

    if (typeof userInput !== 'string') throw new TypeError('userInput doit être un "string"');
    if (userInput.length < order) throw new RangeError(`userInput doit être au minimum de longueur ${order}`);
    if (!markovChain.has(userInput.slice(-order))) throw Error(`${userInput} n'est pas contenu dans markovChain`);

    // 27 : mot le plus long en français
    return range(0, 27).reduce(accumulator => {

        const nextChar = generateNextChar(markovChain, accumulator.slice(-order));
        if (nextChar === '' || nextChar === ' ') return accumulator;

        return accumulator + nextChar;
    }, userInput);
}