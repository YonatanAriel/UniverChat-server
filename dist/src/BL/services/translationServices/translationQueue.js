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
const translateMessage_1 = __importDefault(require("./translateMessage"));
class TranslationQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }
    queueMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.queue.push(message);
            if (!this.processing) {
                this.processQueue();
            }
        });
    }
    processQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            this.processing = true;
            while (this.queue.length > 0) {
                const batch = this.queue.splice(0, 10); // Process 10 messages at a time
                try {
                    const translations = yield Promise.all(batch.map((msg) => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        try {
                            const translation = yield (0, translateMessage_1.default)(msg.msgText, "en" // Default target language
                            );
                            return {
                                originalMessage: msg,
                                translatedText: translation.translatedText,
                                detectedLanguage: (_a = translation.detectedLanguage) === null || _a === void 0 ? void 0 : _a.language,
                            };
                        }
                        catch (error) {
                            console.error("Translation error for message:", msg);
                            return {
                                originalMessage: msg,
                                error: true,
                                translatedText: msg.msgText, // Fallback to original text
                            };
                        }
                    })));
                    // Store translated messages
                    // await Promise.all(
                    //   translations.map(async (result) => {
                    //     await MessagesServices.updateMessageTranslation(
                    //need to add this function! (updateMessageTranslation)
                    //       result.originalMessage.id,
                    //       result.translatedText,
                    //       result.detectedLanguage
                    //     );
                    //   })
                    // );
                }
                catch (e) {
                    console.error("Batch translation error", e);
                }
            }
            this.processing = false;
        });
    }
}
exports.default = new TranslationQueue();
