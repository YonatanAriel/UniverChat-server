export type DateData = {
  date: number;
  month: number;
  hours: number;
  minutes: number;
};

//need to move to the Message interface instead
export type Message = {
  text: string;
  name: string;
  messageTime: DateData;
};
