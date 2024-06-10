export type DateData = {
  date: number;
  month: number;
  hours: number;
  minutes: number;
};

export type Message = {
  text: string;
  name: string;
  messageTime: DateData;
};
