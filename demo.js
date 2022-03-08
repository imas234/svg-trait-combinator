import { getJsonFileData, writeJSONToOutputDirectory } from "./read-write/index.js";
import generateSVGCombinations from "./svg/index.js";
import traitCombinatorInator from "./traitcombinator-inator/index.js";

const path = process.cwd();
const allTraitCombinations = traitCombinatorInator(getJsonFileData("./input/traits.json"));

allTraitCombinations.forEach((val, idx) => {
    writeJSONToOutputDirectory(JSON.stringify(val, null, 4), idx + ".json", path);
});

generateSVGCombinations(allTraitCombinations);
