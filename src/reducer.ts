import { initialState } from "./store";
import { ActionTypes, Actions } from "./actions";
export const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.PUT_ITEM: {
      const { item } = action.payload;
      const itemList = [...state.itemList, item];
      return { ...state, itemList };
    }
    case ActionTypes.SET_ITEMS: {
      const { items } = action.payload;
      const itemList = [...items];
      return { ...state, itemList };
    }
    case ActionTypes.SET_TOTALS: {
      const { totals } = action.payload;
      const totalList = [...totals];
      return { ...state, totalList };
    }

    default: {
      return state;
    }
  }
};
