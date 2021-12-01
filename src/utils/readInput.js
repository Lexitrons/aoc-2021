import { readFileSync } from "fs";

function readInput(path = '') {
  console.log( path )
  return readFileSync(path, "utf8")
    .split(/\n/g)
}

export default readInput;