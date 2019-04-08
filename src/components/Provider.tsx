import React, {
  createContext,
  useEffect,
  useCallback,
  useReducer,
  Dispatch
} from "react";
import { initialState, AppState } from "../store";
import { reducer } from "../reducer";
import { Actions, ActionTypes } from "../actions";
import { sideEffector } from "../sideEffector";
import { useSideEffector } from "../util/useSideEffector";
interface IRootContext {
  state: AppState;
  dispatch?: Dispatch<Actions>;
}
export const RootContext = createContext<IRootContext>({
  state: initialState
});

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useSideEffector(
    useReducer(reducer, initialState),
    sideEffector
  );
  useEffect(() => {
    dispatch({ type: ActionTypes.LOAD_ITEMS });
    dispatch({ type: ActionTypes.LOAD_TOTALS });
  }, []);
  const value: IRootContext = {
    state,
    dispatch
  };
  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};
