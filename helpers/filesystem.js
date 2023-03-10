"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputFileSync = exports.outputFile = exports.mkdirRecursiveSync = exports.mkdirRecursive = exports.parsePath = exports.fsWriteFile = exports.fsMkdir = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const util_1 = require("util");
exports.fsMkdir = util_1.promisify(fs_1.default.mkdir);
exports.fsWriteFile = util_1.promisify(fs_1.default.writeFile);
function parsePath(targetPath) {
    const directories = [];
    const parsedPath = path_1.default.parse(path_1.default.resolve(targetPath));
    const splitPath = parsedPath.dir.split(path_1.default.sep);
    if (parsedPath.root === "/") {
        splitPath[0] = `/${splitPath[0]}`;
    }
    splitPath.reduce((previous, next) => {
        const directory = path_1.default.join(previous, next);
        directories.push(directory);
        return path_1.default.join(directory);
    });
    return directories;
}
exports.parsePath = parsePath;
async function mkdirRecursive(filePath) {
    const directories = parsePath(filePath);
    for (const directory of directories) {
        try {
            await exports.fsMkdir(directory);
        }
        catch (err) {
            if (err.code !== "EEXIST") {
                throw err;
            }
        }
    }
}
exports.mkdirRecursive = mkdirRecursive;
function mkdirRecursiveSync(filePath) {
    const directories = parsePath(filePath);
    for (const directory of directories) {
        if (!fs_1.default.existsSync(directory)) {
            fs_1.default.mkdirSync(directory);
        }
    }
}
exports.mkdirRecursiveSync = mkdirRecursiveSync;
async function outputFile(filePath, fileContent) {
    try {
        await exports.fsWriteFile(filePath, fileContent);
    }
    catch (err) {
        if (err.code !== "ENOENT") {
            throw err;
        }
        await mkdirRecursive(filePath);
        await exports.fsWriteFile(filePath, fileContent);
    }
}
exports.outputFile = outputFile;
function outputFileSync(filePath, fileContent) {
    try {
        fs_1.default.writeFileSync(filePath, fileContent);
    }
    catch (e) {
        if (e.code !== "ENOENT") {
            throw e;
        }
        mkdirRecursiveSync(filePath);
        fs_1.default.writeFileSync(filePath, fileContent);
    }
}
exports.outputFileSync = outputFileSync;
