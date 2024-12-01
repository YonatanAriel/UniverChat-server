import axios from "axios";

const translationApiUrl =
  process.env.LIBRETRANSLATE_URL || "http://localhost:5000";

const detectLanguage = async (text: string): Promise<string> => {
  try {
    const res = await axios.post(`${translationApiUrl}/detect`, {
      q: text,
    });
    return res.data[0].language;
  } catch (e) {
    console.error("Language detection error:", e);
    return "en"; // Default to English if detection fails
  }
};
