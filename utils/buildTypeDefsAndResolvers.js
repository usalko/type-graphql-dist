"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTypeDefsAndResolversSync = exports.buildTypeDefsAndResolvers = void 0;
const graphql_1 = require("graphql");
const buildSchema_1 = require("./buildSchema");
const createResolversMap_1 = require("./createResolversMap");
async function buildTypeDefsAndResolvers(options) {
    const schema = await buildSchema_1.buildSchema(options);
    return createTypeDefsAndResolversMap(schema);
}
exports.buildTypeDefsAndResolvers = buildTypeDefsAndResolvers;
function buildTypeDefsAndResolversSync(options) {
    const schema = buildSchema_1.buildSchemaSync(options);
    return createTypeDefsAndResolversMap(schema);
}
exports.buildTypeDefsAndResolversSync = buildTypeDefsAndResolversSync;
function createTypeDefsAndResolversMap(schema) {
    const typeDefs = graphql_1.printSchema(schema);
    const resolvers = createResolversMap_1.createResolversMap(schema);
    return { typeDefs, resolvers };
}
