import { Dispatch } from "react";
import { SideEffector } from "./util/useSideEffector";
import { AppState } from "./store";
import { Actions, ActionTypes } from "./actions";
import { db, TotalQuery, IItem } from "./AppDb";
import { toDateKey } from "./util/converter";
import _ from "lodash";
import moment from "moment";
const DISPLAY_DAY_SPAN = 3;
const putItem = async (dispatch: Dispatch<Actions>, item: IItem) => {
  const { date, timeRangeIndex } = item;
  await db.items.put(item);
  const query: TotalQuery = { date, timeRangeIndex };
  dispatch({ type: ActionTypes.CALC_TOTAL, payload: { query } });
  dispatch({ type: ActionTypes.LOAD_ITEMS });
};
const deleteItem = async (dispatch: Dispatch<Actions>, id: number) => {
  const item = await db.items.get(id);
  if (!item) {
    return;
  }
  const { date, timeRangeIndex } = item;
  const query: TotalQuery = { date, timeRangeIndex };
  await db.items.delete(id);
  dispatch({ type: ActionTypes.CALC_TOTAL, payload: { query } });
  dispatch({ type: ActionTypes.LOAD_ITEMS });
};
const loadItems = async (dispatch: Dispatch<Actions>) => {
  const items = await db.items
    .where("datetime")
    .between(
      moment()
        .local()
        .startOf("days")
        .subtract(DISPLAY_DAY_SPAN, "days")
        .toDate(),
      moment()
        .local()
        .endOf("days")
        .toDate()
    )
    .sortBy("dattime");

  dispatch({ type: ActionTypes.SET_ITEMS, payload: { items } });
};
const loadTotals = async (dispatch: Dispatch<Actions>) => {
  const totals = await db.totals.toArray();
  dispatch({ type: ActionTypes.SET_TOTALS, payload: { totals } });
  dispatch({ type: ActionTypes.SCROLL_BOTTOM });
};
const calcTotal = async (dispatch: Dispatch<Actions>, query: TotalQuery) => {
  const totalDoc = await db.totals.get({ ...query });
  const dateKey = toDateKey(query.date, query.timeRangeIndex);
  const values = await db.items.where({ ...query }).toArray();
  const totalValue = _.sumBy(values, "value");
  await db.totals.put({ ...totalDoc, ...query, value: totalValue, dateKey });
  dispatch({ type: ActionTypes.LOAD_TOTALS });
};

export const sideEffector: SideEffector<AppState, Actions> = (
  action,
  dispatch,
  state
) => {
  switch (action.type) {
    case ActionTypes.PUT_ITEM: {
      putItem(dispatch, action.payload.item);
      return;
    }
    case ActionTypes.DELETE_ITEM: {
      deleteItem(dispatch, action.payload.id);
      return;
    }
    case ActionTypes.LOAD_ITEMS: {
      loadItems(dispatch);
      return;
    }
    case ActionTypes.CALC_TOTAL: {
      calcTotal(dispatch, action.payload.query);
      return;
    }
    case ActionTypes.LOAD_TOTALS: {
      loadTotals(dispatch);
      return;
    }
  }
};
