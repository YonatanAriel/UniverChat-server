import axios from "axios";
import { translationApiUrl } from "../../../Constants";
import { TranslationResponse } from "../../../types/types";
import detectLanguage from "./detectLanguage";

const translateText = async (
  text: string,
  targetLanguage: string = "en",
  sourceLanguage?: string
): Promise<TranslationResponse> => {
  try {
    const payload = {
      q: text,
      source: sourceLanguage || (await detectLanguage(text)),
      target: targetLanguage,
    };

    const res = await axios.post(`${translationApiUrl}/translate`, payload);

    return {
      translatedText: res.data.translatedText,
      detectedLanguage: {
        language: payload.source,
        confidence: 1,
      },
    };
  } catch (e) {
    console.error("Translation error:", e);
    return { translatedText: text }; // Fallback to original text
  }
};

export default translateText;
