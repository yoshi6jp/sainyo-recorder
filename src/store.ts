import { IItem, ITotal, IValue } from "./AppDb";
export interface AppState {
  itemList: IItem[];
  totalList: ITotal[];
  valueList: IValue[];
}

export const initialState: AppState = {
  itemList: [],
  totalList: [],
  valueList: []
};
