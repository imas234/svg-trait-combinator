import { getJsonFileData, writeJSONToOutputDirectory, makeOutputDirectory } from "./read-write/index.js";
import generateSVGCombinations from "./svg/index.js";
import traitCombinatorInator from "./traitcombinator-inator/index.js";

const path = process.cwd();
const allTraitCombinations = traitCombinatorInator(getJsonFileData("./input/traits.json"));

makeOutputDirectory(path);

allTraitCombinations.forEach((val, idx) => {
    writeJSONToOutputDirectory(JSON.stringify(val, null, 4), idx + ".json", path);
});

generateSVGCombinations(allTraitCombinations);
