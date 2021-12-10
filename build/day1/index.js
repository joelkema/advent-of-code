"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignment2 = exports.assignment1 = void 0;
var input_1 = __importDefault(require("./input"));
var assignment1 = function () { return input_1.default.filter(function (v, i) { return v < input_1.default[i + 1]; }).length; };
exports.assignment1 = assignment1;
var add = function (accumulator, a) { return accumulator + a; };
var sliceAndSum = function (start, end) { return input_1.default.slice(start, end).reduce(add, 0); };
var assignment2 = function () {
    return input_1.default.filter(function (v, i) { return sliceAndSum(i + 1, i + 4) > sliceAndSum(i, i + 3); }).length;
};
exports.assignment2 = assignment2;
