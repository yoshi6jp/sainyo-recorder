import React, { useContext, useRef, useEffect } from "react";
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableContent,
  DataTableHead,
  DataTableHeadCell,
  DataTableRow
} from "@rmwc/data-table";
import { RootContext } from "./Provider";
import { ITotal, IItem } from "../AppDb";
import moment from "moment";
import _ from "lodash";
import { timeRange } from "../util/converter";

interface IItemKyeIdx {
  dateKey: string;
  timeRangeIndex: number;
  hasDayTotal: boolean;
  items: IItem[];
  hasBottomEl: boolean;
}
const ItemsTotal = ({
  items,
  totals,
  hasDayTotal,
  dateKey,
  timeRangeIndex,
  hasBottomEl
}: {
  items: IItem[];
  totals: ITotal[];
  dateKey: string;
  hasDayTotal: boolean;
  timeRangeIndex: number;
  hasBottomEl: boolean;
}) => {
  const {
    state: { scrollBottomEvt }
  } = useContext(RootContext);

  const bottomEl = useRef<HTMLElement>(null);
  useEffect(() => {
    if (bottomEl.current && hasBottomEl) {
      bottomEl.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [bottomEl, scrollBottomEvt]);

  const total = _.find(totals, { dateKey, timeRangeIndex });
  let dayTotal: number = NaN;
  if (hasDayTotal) {
    dayTotal = _.chain(totals)
      .filter({ dateKey })
      .sumBy("value")
      .value();
  }

  return (
    <>
      {items.map(item => (
        <DataTableRow key={item.datetime.getTime()}>
          <DataTableCell>
            {moment(item.datetime)
              .local()
              .format("MM/DD")}
          </DataTableCell>
          <DataTableCell>
            {moment(item.datetime)
              .local()
              .format("HH:mm")}
          </DataTableCell>
          <DataTableCell alignEnd>{item.value}</DataTableCell>
        </DataTableRow>
      ))}
      {total && (
        <DataTableRow className="table-info">
          <DataTableCell>{moment(total.date).format("MM/DD")}</DataTableCell>
          <DataTableCell>{timeRange(total.timeRangeIndex)}</DataTableCell>
          <DataTableCell alignEnd>{total.value}</DataTableCell>
        </DataTableRow>
      )}
      {!Number.isNaN(dayTotal) && (
        <DataTableRow className="table-success" ref={bottomEl}>
          <DataTableCell>{moment(dateKey).format("MM/DD")}</DataTableCell>
          <DataTableCell>合計(06:00-06:00)</DataTableCell>
          <DataTableCell alignEnd>{dayTotal}</DataTableCell>
        </DataTableRow>
      )}
    </>
  );
};
export const ItemList = () => {
  const {
    state: { totalList, itemListByDate }
  } = useContext(RootContext);
  const total = _.last(totalList);
  const dateKey = total
    ? total.dateKey
    : moment()
        .local()
        .format("YYYY-MM-DD");
  let items: IItemKyeIdx[] = [];
  if (!_.isEmpty(itemListByDate)) {
    items = _.chain(itemListByDate)
      .keys()
      .sort()
      .map(dateKey => ({ dateKey, items: itemListByDate[dateKey] }))
      .map(({ dateKey, items }) => {
        const len = _.keys(items).length;
        return _.chain(items)
          .keys()
          .map(Number)
          .sort((a, b) => {
            if (a === 0) {
              return 1;
            } else if (b === 0) {
              return -1;
            } else if (a > b) {
              return 1;
            } else if (a < b) {
              return -1;
            } else {
              return 0;
            }
          })
          .map((timeRangeIndex, idx) => ({
            dateKey,
            timeRangeIndex,
            items: items[timeRangeIndex],
            hasDayTotal: idx + 1 === len,
            hasBottomEl: false
          }))
          .value();
      })
      .flatten()
      .value();
    _.set(_.last(items) || {}, "hasBottomEl", true);
  }
  return (
    <DataTable stickyRows={1} style={{ height: "calc(100vh - 100px)" }}>
      <DataTableContent>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeadCell>日付</DataTableHeadCell>
            <DataTableHeadCell>時間</DataTableHeadCell>
            <DataTableHeadCell>採尿量</DataTableHeadCell>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          {items.map(item => (
            <ItemsTotal
              {...item}
              key={`${item.dateKey}-${item.timeRangeIndex}`}
              totals={totalList}
            />
          ))}
        </DataTableBody>
      </DataTableContent>
    </DataTable>
  );
};
