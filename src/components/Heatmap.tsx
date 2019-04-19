import React, { useContext, useCallback } from "react";
import { RootContext } from "./Provider";
import _ from "lodash";
import moment from "moment";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
interface IValue {
  date: Date;
  count: number;
}
export const Heatmap = () => {
  const {
    state: { totalList }
  } = useContext(RootContext);
  const values = _.chain(totalList)
    .groupBy("dateKey")
    .mapValues(items => _.sumBy(items, "value"))
    .map((count, date) => ({ date: moment(date).toDate(), count }))
    .sortBy("date")
    .value();
  console.log(values);
  const maxCount =
    _.chain(values)
      .maxBy("count")
      .get("count")
      .value() || 1;
  const tooltipDataAttrs = useCallback(
    (value: IValue) => ({
      "data-tip": value.date
        ? `[${moment(value.date).format("YYYY/MM/DD")}] ${value.count} ml`
        : "",
      "data-event": "click"
    }),
    []
  );
  const classForValue = useCallback(
    (value: IValue) =>
      `color-github-${Math.ceil((_.get(value, "count", 0) / maxCount) * 4)}`,
    [maxCount]
  );
  const startDate = moment()
    .subtract(3, "month")
    .toDate();
  return (
    <>
      <CalendarHeatmap
        startDate={startDate}
        showWeekdayLabels={true}
        values={values}
        tooltipDataAttrs={tooltipDataAttrs}
        monthLabels={_.range(1, 13).map(String)}
        weekdayLabels={["日", "月", "火", "水", "木", "金", "土"]}
        classForValue={classForValue}
      />
      <ReactTooltip globalEventOff="click" />
    </>
  );
};
