import React, { useEffect, useState, useCallback, useRef } from "react";
import { observer, inject } from "mobx-react";

import Container from "@/components/container";
import Tabs from "@/components/Tabs";
import { Root, Title } from "./css";
import Personal from './personal'
import Account from './account'

const tabList = [
  {
    name: 'Personal',
    value: 1,
    key: 'personal',
  },
  {
    name: 'Account',
    value: 2,
    key: 'account',
  }
]

const Index = () => {
  return (
    <Container noSearch="false">
      <Root>
        <Title>Setting</Title>
        <Tabs tabList={tabList} extraHeight={285} matchKey="name">
          <Personal />
          <Account />
        </Tabs>
      </Root>
    </Container>
  );
};

export default inject("store")(observer(Index));
