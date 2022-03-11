import { getConsistentFilePath, getDirectoryChildren, readFile, writeSVGToOutputDirectory } from "../read-write/index.js";

const makeGetSvgString = (fullSvgString) => {
    const firstCloseTagIndex = fullSvgString.indexOf('>');
    const svgCloseTagIndex = fullSvgString.indexOf('</svg>');
    
    const startingTag = fullSvgString.substring(0, firstCloseTagIndex + 1);
    const closingTag = fullSvgString.substring(svgCloseTagIndex);
  
    const getSvgString = (insides) => {
      return startingTag + "\n" + insides + "\n" + closingTag;
    };
    
    return getSvgString;
}

const getSvgInsides = (svgString = "") => {
    const firstCloseTagIndex = svgString.indexOf(">");
    const svgCloseTagIndex = svgString.indexOf("</svg>");

    return svgString.substring(firstCloseTagIndex + 1, svgCloseTagIndex);
}

const generateSvgUtils = (filepath) => {
    const pathToSVGDirectories = getConsistentFilePath(filepath) + "input/svg";

    const traitToSVGMap = {};
    const traits = getDirectoryChildren(pathToSVGDirectories);

    let getSvgString = null;
  
    for (const trait of traits) {
        traitToSVGMap[trait] = {};

        const filepathOfTrait = pathToSVGDirectories + "/" + trait;
        const traitSvgFiles = getDirectoryChildren(filepathOfTrait);

        for (const traitSvgFile of traitSvgFiles) {
            const svgTraitId = traitSvgFile.replace(".svg", "");
            const svgTrait = readFile(filepathOfTrait + "/" + traitSvgFile);

            if (!getSvgString) {
                getSvgString = makeGetSvgString(svgTrait);
            }

            traitToSVGMap[trait][svgTraitId] = getSvgInsides(svgTrait);
        }
    }

    return [traitToSVGMap, getSvgString];
}

const generateSvg = (traitCombination, svgMap, getSvgString) => {
    const traits = Object.entries(traitCombination);

    let svgInsides = "";

    for (const trait of traits) {
        const [traitType, traitValue] = trait;
        svgInsides += svgMap[traitType][traitValue];
    }

    return getSvgString(svgInsides);
}

const generateSVGCombinations = (traitCombinations) => {
    const path = process.cwd();
    const [svgMap, getSvgString] = generateSvgUtils(path);

    traitCombinations.forEach((traitCombination, index) => {
        const svgString = generateSvg(traitCombination, svgMap, getSvgString);
        writeSVGToOutputDirectory(svgString, index + ".svg", path);
    })
};

export default generateSVGCombinations;