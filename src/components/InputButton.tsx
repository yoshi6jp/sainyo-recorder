import React, { useContext, useCallback, useState } from "react";
import { Fab } from "@rmwc/fab";
import { Modal, List, InputItem, DatePicker, Button } from "antd-mobile";
import enUs from "antd-mobile/lib/date-picker/locale/en_US";
import { RootContext } from "./Provider";
import { ActionTypes } from "../actions";
import { toTimeRangeIndex } from "../util/converter";
import styles from "./InputButton.module.css";
import classnames from "classnames";
import moment from "moment";
export const InputButton = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [datetime, setDatetime] = useState<Date>(new Date());
  const [value, setValue] = useState<string>("");
  const { dispatch } = useContext(RootContext);
  const onOpen = useCallback(() => {
    setDatetime(new Date());
    setVisible(true);
    dispatch && dispatch({ type: ActionTypes.HIDE_NAVS });
  }, [setVisible, dispatch]);
  const onClose = useCallback(() => {
    setVisible(false);
    dispatch && dispatch({ type: ActionTypes.SHOW_NAVS });
  }, [setVisible, dispatch]);
  const onDatetimeChange = useCallback(
    (date: Date) => {
      setDatetime(date);
    },
    [setDatetime]
  );
  const onValueChange = useCallback(
    (val: string) => {
      setValue(val);
    },
    [setValue]
  );
  const onSubmit = useCallback(() => {
    const num = Number(value) || 0;
    if (num > 0 && dispatch) {
      const item = {
        datetime,
        date: moment(datetime).format("YYYY-MM-DD"),
        value: num,
        timeRangeIndex: toTimeRangeIndex(datetime)
      };
      dispatch({ type: ActionTypes.PUT_ITEM, payload: { item } });
      setValue("");
      setVisible(false);
      dispatch({ type: ActionTypes.SHOW_NAVS });
    }
  }, [dispatch, datetime, value, setVisible]);
  return (
    <div className={classnames(styles.top)}>
      <Fab icon="add" onClick={onOpen} />
      <Modal
        closable={true}
        popup
        visible={visible}
        animationType="slide-up"
        onClose={onClose}
        className={classnames(styles.modal)}
      >
        <List renderHeader={"採尿量入力"}>
          <DatePicker
            locale={enUs}
            value={datetime}
            onChange={onDatetimeChange}
          >
            <List.Item>日時</List.Item>
          </DatePicker>
          <InputItem
            type={"number"}
            onChange={onValueChange}
            defaultValue={value}
            extra="ml"
          >
            採尿量
          </InputItem>
          <List.Item>
            <Button onClick={onSubmit} type="primary">
              登録
            </Button>
          </List.Item>
        </List>
      </Modal>
    </div>
  );
};
