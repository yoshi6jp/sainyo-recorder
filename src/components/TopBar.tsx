import React from "react";
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarFixedAdjust
} from "@rmwc/top-app-bar";
import styles from "./TopBar.module.css";
export const TopBar = () => {
  return (
    <>
      <TopAppBar className={styles.top}>
        <TopAppBarRow>
          <TopAppBarSection>
            <TopAppBarTitle>採尿量レコーダー</TopAppBarTitle>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
    </>
  );
};
