"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadResolversFromGlob = exports.findFileNamesFromGlob = void 0;
const tslib_1 = require("tslib");
const glob_1 = tslib_1.__importDefault(require("glob"));
function findFileNamesFromGlob(globString) {
    return glob_1.default.sync(globString);
}
exports.findFileNamesFromGlob = findFileNamesFromGlob;
function loadResolversFromGlob(globString) {
    const filePaths = findFileNamesFromGlob(globString);
    const modules = filePaths.map(fileName => require(fileName));
}
exports.loadResolversFromGlob = loadResolversFromGlob;
