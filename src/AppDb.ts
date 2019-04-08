import Dexie from "dexie";
export interface IItem {
  id?: number;
  datetime: Date;
  date: string;
  timeRangeIndex: number;
  value: number;
}
export interface TotalQuery {
  date: string; // YYYY-MM-DD
  timeRangeIndex: number;
}
export interface ITotal extends TotalQuery {
  id?: number;
  value: number;
  dateKey: string;
}
export interface IValue {
  id?: number;
  value: number;
}

export class AppDatabase extends Dexie {
  items: Dexie.Table<IItem, number>;
  totals: Dexie.Table<ITotal, number>;
  constructor() {
    super("SainyoRecorderDatabase");
    this.version(1).stores({
      items: "++id, date, datetime, timeRangeIndex,value",
      totals: "++id, date, timeRangeIndex, value, dateKey",
      values: "++id, value"
    });
    this.items = this.table("items");
    this.totals = this.table("totals");
  }
}
export const db = new AppDatabase();
