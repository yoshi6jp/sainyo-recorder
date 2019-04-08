import React, { useContext } from "react";
import { RootContext } from "./Provider";
import { ITotal, IItem } from "../AppDb";
import moment from "moment";
import _ from "lodash";
import { timeRange } from "../util/converter";
const ItemsTotal = ({ items, total }: { items: IItem[]; total: ITotal }) => {
  return (
    <>
      {items.map((item, idx) => {
        <tr key={idx}>
          <td>
            {moment(item.datetime)
              .local()
              .format("MM/DD")}
          </td>
          <td>
            {moment(item.datetime)
              .local()
              .format("HH:mm")}
          </td>
          <td>{item.value}</td>
        </tr>;
      })}
    </>
  );
};
export const ItemList = () => {
  const {
    state: { itemList, totalList }
  } = useContext(RootContext);
  const total = _.last(totalList);
  const dayTotal = _.chain(totalList)
    .filter({
      dateKey: moment()
        .local()
        .format("YYYY-MM-DD")
    })
    .sumBy("value")
    .valueOf();
  return (
    <table className="table">
      <thead>
        <tr>
          <th>日付</th>
          <th>時間</th>
          <th className="text-right">採尿量</th>
        </tr>
      </thead>
      <tbody>
        {itemList.map(item => (
          <tr key={item.datetime.getTime()}>
            <td>
              {moment(item.datetime)
                .local()
                .format("MM/DD")}
            </td>
            <td>
              {moment(item.datetime)
                .local()
                .format("HH:mm")}
            </td>
            <td className="text-right">{item.value}</td>
          </tr>
        ))}
        {total && (
          <>
            <tr className="table-info">
              <td>{moment(total.date).format("MM/DD")}</td>
              <td>{timeRange(total.timeRangeIndex)}</td>
              <td className="text-right">{total.value}</td>
            </tr>
            <tr className="table-success">
              <td>{moment(total.dateKey).format("MM/DD")}</td>
              <td>合計(06:00-06:00)</td>
              <td className="text-right">{dayTotal}</td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
};
