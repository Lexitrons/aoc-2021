import { readFileSync } from "fs";

const readInput = (path = '') => readFileSync(path, "utf8").split(/\n/g)

export default readInput;