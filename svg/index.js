import { getConsistentFilePath, getDirectoryChildren, readFile, writeSVGToOutputDirectory } from "../read-write/index.js";

const getSvgString = (insides) => {
    return `
    <svg
    width="512"
    height="512"
    viewBox="0 0 135.46667 135.46667"
    version="1.1"
    id="svg5"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg">
        ${insides}
    </svg>
    `;
}

const getSvgInsides = (svgString = "") => {
    const firstCloseTagIndex = svgString.indexOf(">");
    const svgCloseTagIndex = svgString.indexOf("</svg>");

    return svgString.substring(firstCloseTagIndex + 1, svgCloseTagIndex);
}

const generateTraitSvgMap = (filepath) => {
    const pathToSVGDirectories = getConsistentFilePath(filepath) + "input/svg";

    const traitToSVGMap = {};
    const traits = getDirectoryChildren(pathToSVGDirectories);

    for (const trait of traits) {
        traitToSVGMap[trait] = {};

        const filepathOfTrait = pathToSVGDirectories + "/" + trait;
        const traitSvgFiles = getDirectoryChildren(filepathOfTrait);

        for (const traitSvgFile of traitSvgFiles) {
            const svgTraitId = traitSvgFile.replace(".svg", "");
            const svgTrait = readFile(filepathOfTrait + "/" + traitSvgFile);

            traitToSVGMap[trait][svgTraitId] = getSvgInsides(svgTrait);
        }
    }

    return traitToSVGMap;
}

const generateSvg = (traitCombination, svgMap) => {
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
    const svgMap = generateTraitSvgMap(path);

    traitCombinations.forEach((traitCombination, index) => {
        const svgString = generateSvg(traitCombination, svgMap);
        writeSVGToOutputDirectory(svgString, index + ".svg", path);
    })
};

export default generateSVGCombinations;