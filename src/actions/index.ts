import { IItem, ITotal, TotalQuery } from "../AppDb";
export enum ActionTypes {
  PUT_ITEM = "PUT_ITEM",
  LOAD_ITEMS = "LOAD_ITEMS",
  SET_ITEMS = "SET_ITEMS",
  PUT_TOTAL = "PUT_TOTAL",
  LOAD_TOTALS = "LOAD_TOTALS",
  SET_TOTALS = "SET_TOTALS",
  CALC_TOTAL = "CALC_TOTAL",
  SCROLL_BOTTOM = "SCROLL_BOTTOM"
}

export interface IAction {
  type: ActionTypes;
  payload?: any;
  meta?: { [key: string]: any };
}
export interface PUT_ITEM extends IAction {
  type: ActionTypes.PUT_ITEM;
  payload: { item: IItem };
}
export interface LOAD_ITEMS extends IAction {
  type: ActionTypes.LOAD_ITEMS;
}
export interface SET_ITEMS extends IAction {
  type: ActionTypes.SET_ITEMS;
  payload: { items: IItem[] };
}
export interface PUT_TOTAL extends IAction {
  type: ActionTypes.PUT_TOTAL;
  payload: { total: ITotal };
}
export interface LOAD_TOTALS extends IAction {
  type: ActionTypes.LOAD_TOTALS;
}
export interface SET_TOTALS extends IAction {
  type: ActionTypes.SET_TOTALS;
  payload: { totals: ITotal[] };
}
export interface CALC_TOTAL extends IAction {
  type: ActionTypes.CALC_TOTAL;
  payload: { query: TotalQuery };
}
export interface SCROLL_BOTTOM extends IAction {
  type: ActionTypes.SCROLL_BOTTOM;
}

export type Actions =
  | PUT_ITEM
  | LOAD_ITEMS
  | SET_ITEMS
  | PUT_TOTAL
  | LOAD_TOTALS
  | SET_TOTALS
  | CALC_TOTAL
  | SCROLL_BOTTOM;
