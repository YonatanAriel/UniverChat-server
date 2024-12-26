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
const axios_1 = __importDefault(require("axios"));
const Constants_1 = require("../../../Constants");
const detectLanguage_1 = __importDefault(require("./detectLanguage"));
const translateText = (text_1, ...args_1) => __awaiter(void 0, [text_1, ...args_1], void 0, function* (text, targetLanguage = "en", sourceLanguage) {
    try {
        const payload = {
            q: text,
            source: sourceLanguage || (yield (0, detectLanguage_1.default)(text)),
            target: targetLanguage,
        };
        const res = yield axios_1.default.post(`${Constants_1.translationApiUrl}/translate`, payload);
        return {
            translatedText: res.data.translatedText,
            detectedLanguage: {
                language: payload.source,
                confidence: 1,
            },
        };
    }
    catch (e) {
        console.error("Translation error:", e);
        return { translatedText: text }; // Fallback to original text
    }
});
exports.default = translateText;
