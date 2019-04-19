import moment from "moment";
const TIME_SPAN = 6;
export const toTimeRangeIndex = (datetime: Date) =>
  Math.floor(
    moment(datetime)
      .local()
      .hour() / TIME_SPAN
  );

export const toDateKey = (date: string, timeRangeIndex: number) =>
  moment(date)
    .local()
    .startOf("days")
    .add(TIME_SPAN * (timeRangeIndex - 1), "hours")
    .format("YYYY-MM-DD");

export const toStartAt = (date: string, timeRangeIndex: number) =>
  moment(date)
    .local()
    .startOf("days")
    .add(TIME_SPAN * timeRangeIndex, "hours")
    .format("YYYY-MM-DD");

export const timeRange = (timeRangeIndex: number) =>
  `${moment()
    .local()
    .startOf("days")
    .add(TIME_SPAN * timeRangeIndex, "hours")
    .format("HH:mm")}-${moment()
    .local()
    .startOf("days")
    .add(TIME_SPAN * (timeRangeIndex + 1), "hours")
    .format("HH:mm")}`;

export const toRange = (timeRnageIndex: number) =>
  `${TIME_SPAN * timeRnageIndex} - ${TIME_SPAN * ((timeRnageIndex + 1) % 4)}`;
