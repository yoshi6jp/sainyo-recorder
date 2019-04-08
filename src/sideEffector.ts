import { Dispatch } from "react";
import { SideEffector } from "./util/useSideEffector";
import { AppState } from "./store";
import { Actions, ActionTypes } from "./actions";
import { db, TotalQuery } from "./AppDb";
import { toDateKey } from "./util/converter";
import _ from "lodash";
const loadItems = async (dispatch: Dispatch<Actions>) => {
  const items = await db.items
    .orderBy("datetime")
    .limit(30)
    .toArray();
  dispatch({ type: ActionTypes.SET_ITEMS, payload: { items } });
};
const loadTotals = async (dispatch: Dispatch<Actions>) => {
  const totals = await db.totals.toArray();
  dispatch({ type: ActionTypes.SET_TOTALS, payload: { totals } });
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
      const { item } = action.payload;
      const { date, timeRangeIndex } = item;
      db.items.put(item);
      const query: TotalQuery = { date, timeRangeIndex };
      dispatch({ type: ActionTypes.CALC_TOTAL, payload: { query } });
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
