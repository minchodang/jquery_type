"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const divide_1 = __importDefault(require("./divide"));
const minus_1 = __importDefault(require("./minus"));
const multiply_1 = __importDefault(require("./multiply"));
const plus_1 = __importDefault(require("./plus"));
exports.default = {
    plus: plus_1.default,
    minus: minus_1.default,
    multiply: multiply_1.default,
    divide: divide_1.default,
};
