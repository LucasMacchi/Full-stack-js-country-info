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
exports.default = default_1;
const axios_1 = __importDefault(require("axios"));
const getCountryCode_1 = __importDefault(require("../Utils/getCountryCode"));
function default_1(countryName) {
    return __awaiter(this, void 0, void 0, function* () {
        const countryCode = yield (0, getCountryCode_1.default)(countryName);
        if (countryCode) {
            const dataPopulation = (yield axios_1.default.get("https://countriesnow.space/api/v0.1/countries/population")).data;
            let populationClean = [];
            dataPopulation.data.forEach(p => {
                if (p.country === countryName)
                    populationClean = p.populationCounts;
            });
            const dataFlag = (yield axios_1.default.get("https://countriesnow.space/api/v0.1/countries/flag/images")).data.data;
            let flag = "";
            dataFlag.forEach(f => {
                if (f.name === countryName)
                    flag = f.flag;
            });
            const dataBorders = (yield axios_1.default.get("https://date.nager.at/api/v3/CountryInfo/" + countryCode)).data;
            const bordersClean = dataBorders.borders.map((b) => {
                return { name: b.commonName, countryCode: b.countryCode };
            });
            bordersClean.forEach(c => {
                dataFlag.forEach(f => {
                    if (f.name === c.name) {
                        c.flag = f.flag;
                    }
                });
            });
            const countryInfo = {
                borderCountries: bordersClean,
                historicalPopulation: populationClean,
                flag: flag
            };
            console.log(countryInfo);
            return countryInfo;
        }
        else {
            throw Error("This country does not exist.");
        }
    });
}
