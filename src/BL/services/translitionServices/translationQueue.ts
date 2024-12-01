import { Message } from "../../../DL/models/message";
import translateText from "./translateMessage";

class TranslationQueue {
  private queue: Message[] = [];
  private processing = false;

  async queueMessage(message: Message) {
    this.queue.push(message);
    if (!this.processing) {
      this.processQueue();
    }
  }

  private async processQueue() {
    this.processing = true;

    while (this.queue.length > 0) {
      const batch = this.queue.splice(0, 10); // Process 10 messages at a time

      try {
        const translations = await Promise.all(
          batch.map(async (msg) => {
            try {
              const translation = await translateText(
                msg.msgText,
                "en" // Default target language
              );

              return {
                originalMessage: msg,
                translatedText: translation.translatedText,
                detectedLanguage: translation.detectedLanguage?.language,
              };
            } catch (error) {
              console.error("Translation error for message:", msg);
              return {
                originalMessage: msg,
                error: true,
                translatedText: msg.msgText, // Fallback to original text
              };
            }
          })
        );

        // Store translated messages
        await Promise.all(
          translations.map(async (result) => {
            await MessagesServices.updateMessageTranslation(
              //need to add this function! (updateMessageTranslation)
              result.originalMessage.id,
              result.translatedText,
              result.detectedLanguage
            );
          })
        );
      } catch (e) {
        console.error("Batch translation error", e);
      }
    }

    this.processing = false;
  }
}
