import fs from 'fs';

export const getJsonFileData = (filepath) => {
    const fileData = fs.readFileSync(filepath);
    return JSON.parse(fileData.toString());
};

export const makeOutputDirectory = (path) => {
    try {
        fs.mkdirSync(getConsistentFilePath(path) + 'output');
        fs.mkdirSync(getConsistentFilePath(path) + 'output/json');
        fs.mkdirSync(getConsistentFilePath(path) + 'output/svg');
    } catch (e) {
        if (e.errno === -17) {
            console.error('Output directory already exists. Try deleting it if the output is not as intended.');
        } else {
            console.error('ERROR MAKING OUTPUT DIRECTORY:', e);
        }
    }
};

export const getConsistentFilePath = (filepath) => (
    filepath.charAt(filepath.length) === '/' ? filepath : (filepath + '/')
);

export const getDirectoryChildren = (filepath) => fs.readdirSync(filepath);

export const readFile = (filePath) => fs.readFileSync(filePath).toString();

export const writeJSONToOutputDirectory = (output, filename, filepath) => {
    const consistentFilePath = getConsistentFilePath(filepath);
    fs.writeFileSync(consistentFilePath + 'output/json/' + filename, output);
};

export const writeSVGToOutputDirectory = (output, filename, filepath) => {
    const consistentFilePath = getConsistentFilePath(filepath);
    fs.writeFileSync(consistentFilePath + 'output/svg/' + filename, output);
};

