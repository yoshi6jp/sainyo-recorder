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
    state: { itemList, totalList, scrollBottomEvt }
  } = useContext(RootContext);
  const total = _.last(totalList);
  const dateKey = total
    ? total.dateKey
    : moment()
        .local()
        .format("YYYY-MM-DD");
  const dayTotal = _.chain(totalList)
    .filter({ dateKey })
    .sumBy("value")
    .valueOf();
  const bottomEl = useRef<HTMLElement>(null);
  useEffect(() => {
    console.log("btm", bottomEl);
    if (bottomEl.current) {
      bottomEl.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [bottomEl, scrollBottomEvt]);
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
          {itemList.map(item => (
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
            <>
              <DataTableRow className="table-info">
                <DataTableCell>
                  {moment(total.date).format("MM/DD")}
                </DataTableCell>
                <DataTableCell>{timeRange(total.timeRangeIndex)}</DataTableCell>
                <DataTableCell alignEnd>{total.value}</DataTableCell>
              </DataTableRow>
              <DataTableRow ref={bottomEl} className="table-success">
                <DataTableCell>
                  {moment(total.dateKey).format("MM/DD")}
                </DataTableCell>
                <DataTableCell>合計(06:00-06:00)</DataTableCell>
                <DataTableCell alignEnd>{dayTotal}</DataTableCell>
              </DataTableRow>
            </>
          )}
        </DataTableBody>
      </DataTableContent>
    </DataTable>
  );
  // return (
  //   <table className="table">
  //     <thead>
  //       <tr>
  //         <th>日付</th>
  //         <th>時間</th>
  //         <th className="text-right">採尿量</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {itemList.map(item => (
  //         <tr key={item.datetime.getTime()}>
  //           <td>
  //             {moment(item.datetime)
  //               .local()
  //               .format("MM/DD")}
  //           </td>
  //           <td>
  //             {moment(item.datetime)
  //               .local()
  //               .format("HH:mm")}
  //           </td>
  //           <td className="text-right">{item.value}</td>
  //         </tr>
  //       ))}
  //       {total && (
  //         <>
  //           <tr className="table-info">
  //             <td>{moment(total.date).format("MM/DD")}</td>
  //             <td>{timeRange(total.timeRangeIndex)}</td>
  //             <td className="text-right">{total.value}</td>
  //           </tr>
  //           <tr className="table-success">
  //             <td>{moment(total.dateKey).format("MM/DD")}</td>
  //             <td>合計(06:00-06:00)</td>
  //             <td className="text-right">{dayTotal}</td>
  //           </tr>
  //         </>
  //       )}
  //     </tbody>
  //   </table>
  // );
};
