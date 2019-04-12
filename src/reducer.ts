import { initialState } from "./store";
import { ActionTypes, Actions } from "./actions";
import _ from "lodash";
import { toDateKey } from "./util/converter";
export const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SET_ITEMS: {
      const { items } = action.payload;
      const itemListByDate = _.chain(items)
        .groupBy(item => toDateKey(item.date, item.timeRangeIndex))
        .mapValues(items => _.groupBy(items, "timeRangeIndex"))
        .value();
      return { ...state, itemListByDate };
    }
    case ActionTypes.SET_TOTALS: {
      const { totals } = action.payload;
      const totalList = [...totals];
      return { ...state, totalList };
    }
    case ActionTypes.SCROLL_BOTTOM: {
      return { ...state, scrollBottomEvt: Date.now() };
    }

    default: {
      return state;
    }
  }
};
