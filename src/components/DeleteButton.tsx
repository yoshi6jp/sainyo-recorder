import React, { useContext, useCallback } from "react";
import { RootContext } from "./Provider";
import { IconButton } from "@rmwc/icon-button";
import { Modal } from "antd-mobile";
import styles from "./DeleteButton.module.css";
import { ActionTypes } from "../actions";
export const DeleteButton = ({ id }: { id?: number }) => {
  const { dispatch } = useContext(RootContext);
  const onPress = useCallback(() => {
    if (id && dispatch) {
      dispatch({ type: ActionTypes.DELETE_ITEM, payload: { id } });
    }
  }, [dispatch, id]);
  const onClick = useCallback(() => {
    Modal.alert("削除しますか?", "", [
      { text: "いいえ" },
      { text: "はい", onPress }
    ]);
  }, [onPress]);
  return <IconButton className={styles.top} icon="delete" onClick={onClick} />;
};
