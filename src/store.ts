import { IItem, ITotal, IValue } from "./AppDb";
import _, { Dictionary } from "lodash";
export type IItemListByDate = Dictionary<Dictionary<IItem[]>>;

export interface AppState {
  itemListByDate: IItemListByDate;
  totalList: ITotal[];
  valueList: IValue[];
  scrollBottomEvt: number;
  isNavsDisplayed: boolean;
}

export const initialState: AppState = {
  itemListByDate: {},
  totalList: [],
  valueList: [],
  scrollBottomEvt: 0,
  isNavsDisplayed: true
};
