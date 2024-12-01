export type DateData = {
  date: number;
  month: number;
  hours: number;
  minutes: number;
};

export type MessageRow = {
  id: number;
  chat_room_id: number;
  user_id: number;
  msg_text: string;
  photo_url?: string | null;
  user_photo?: string | null;
  timestamp: string;
};

export type TranslationResponse = {
  translatedText: string;
  detectedLanguage?: {
    language: string;
    confidence: number;
  };
};
