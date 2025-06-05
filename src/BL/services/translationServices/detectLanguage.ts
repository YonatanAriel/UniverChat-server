import axios from "axios";
import { translationApiUrl } from "../../../Constants";

const detectLanguage = async (text: string): Promise<string> => {
  try {
    const res = await axios.post(`${translationApiUrl}/detect`, {
      q: text,
    });
    console.log(res.data[0].language);
    return res.data[0].language;
  } catch (e) {
    console.error("Language detection error:", e);
    return "en"; // Default to English if detection fails
  }
};

export default detectLanguage;
