import React, { useContext } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import { RootContext } from "./Provider";
import { toRange } from "../util/converter";
import moment from "moment";
import _ from "lodash";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from "recharts";
export const Chart = () => {
  const { width } = useWindowSize();
  const {
    state: { totalList }
  } = useContext(RootContext);
  const data = _.chain(totalList)
    .groupBy("dateKey")
    .mapValues(items =>
      _.reduce(
        items,
        (result, item) => ({
          ...result,
          [toRange(item.timeRangeIndex)]: item.value
        }),
        {}
      )
    )
    .map((item, dateKey) => ({
      dateKey,
      name: moment(dateKey).format("MM/DD"),
      ...item
    }))
    .sortBy("dateKey")
    .value();
  return (
    <BarChart
      width={width}
      height={width / 2}
      data={data}
      margin={{ top: 20, right: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="6 - 12" stackId="a" fill="#007bff" />
      <Bar dataKey="12 - 18" stackId="a" fill="#28a745" />
      <Bar dataKey="18 - 0" stackId="a" fill="#ffc107" />
      <Bar dataKey="0 - 6" stackId="a" fill="#17a2b8" />
    </BarChart>
  );
};
