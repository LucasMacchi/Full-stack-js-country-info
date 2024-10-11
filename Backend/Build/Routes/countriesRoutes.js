"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countriesRouter = void 0;
const express_1 = require("express");
const availableCountries_1 = __importDefault(require("../Controller/availableCountries"));
const countryInfo_1 = __importDefault(require("../Controller/countryInfo"));
exports.countriesRouter = (0, express_1.Router)();
exports.countriesRouter.get("/", (_req, res) => {
    res.send("Countries routes working.");
});
exports.countriesRouter.get("/available", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, availableCountries_1.default)();
        if (response) {
            res.send(response);
        }
        else {
            res.status(401).send("No countries available");
        }
    }
    catch (error) {
        res.status(404).send("Error while requesting information");
    }
}));
exports.countriesRouter.get("/info/:countryName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countryName = req.params.countryName;
        const response = yield (0, countryInfo_1.default)(countryName);
        if (response) {
            res.send(response);
        }
        else {
            res.status(401).send("No information about this country");
        }
    }
    catch (error) {
        //console.log(error)
        res.status(404).send("Error while requesting information");
    }
}));
