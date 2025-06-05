export const cleanText = (text, start, end) => {

    if (typeof text !== 'string') throw new TypeError('text doit être un "string"');
    if (typeof start !== 'string') throw new TypeError('start doit être un "string"');
    if (typeof end !== 'string') throw new TypeError('end doit être un "string"');

    const startIndex = text.indexOf(start) + start.length;
    const endIndex = text.indexOf(end);

    if (startIndex === -1) throw new Error("Le début de votre texte n'a pas été retrouvé");
    if (endIndex === -1) throw new Error("La fin de votre texte n'a pas été retrouvé");

    return text
        .slice(startIndex, endIndex)
        .toLocaleLowerCase('fr')
        .replace(/\r?\n/g, " ")
        .replace(/[^a-zà-öø-ÿœæç '\u2019]/gu, " ")
        .replace(/ {2,}/g, " ")
        .trim();
}

export const range = (start, stop, step = 1) =>
    Array.from(
        { length: Math.ceil((stop - start) / step) },
        (_, i) => start + i * step,
    );