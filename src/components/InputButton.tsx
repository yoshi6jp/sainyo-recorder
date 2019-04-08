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
  const { state, dispatch } = useContext(RootContext);
  const onOpen = useCallback(() => {
    setDatetime(new Date());
    setVisible(true);
  }, [setVisible]);
  const onClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);
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
    }
  }, [dispatch, datetime, value, setVisible]);
  return (
    <>
      <Fab icon="add" onClick={onOpen} className={classnames(styles.top)} />
      <Modal popup visible={visible} animationType="slide-up" onClose={onClose}>
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
    </>
  );
};
