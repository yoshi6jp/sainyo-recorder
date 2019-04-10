import { IItem, ITotal, IValue } from "./AppDb";
export interface IItemListByDate {
  [dateKey: string]: {
    [timeRangeIndex: number]: IItem;
  };
}
export interface AppState {
  itemList: IItem[];
  itemListByDate: IItemListByDate;
  totalList: ITotal[];
  valueList: IValue[];
  scrollBottomEvt: number;
}

export const initialState: AppState = {
  itemList: [],
  itemListByDate: {},
  totalList: [],
  valueList: [],
  scrollBottomEvt: 0
};
