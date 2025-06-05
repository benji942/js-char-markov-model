import fs from "node:fs";

export const readText = path => {
    try {
        return fs.readFileSync(path, 'utf8');
    } catch (err) {
        throw new Error(`Le fichier ${path} n'a pas pu être ouvert : ${err.message}`);
    }
}