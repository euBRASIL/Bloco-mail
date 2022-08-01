import React, { useEffect, useState, useCallback, useRef } from "react";
import { withRouter, useParams } from "react-router-dom";
import { observer, inject } from "mobx-react";

import Container from "@/components/container";

import { Root, Title, Tabs, TabContent } from "./css";
import Personal from './personal'
import Account from './account'

const tabList = [
  {
    name: 'Personal',
    value: 1,
  },
  {
    name: 'Account',
    value: 2,
  }
]

const Index = () => {
  const { tabname } = useParams();
  // const [loading, setLoading] = useState(false);
  // const [avaLoading, setAvaLoading] = useState(false);
  
  const [currentTab, setCurrentTab] = useState(() => {
    if (tabname) {
      const filterTab = tabList.filter(({ name }) => name.toLowerCase() === tabname)
      if (filterTab.length) {
        return filterTab[0].value
      }
    }
    return tabList[0].value
  })
  const onTabClick = (value) => () => {
    setCurrentTab(value)
  }

  return (
    <Container noSearch="false">
      <Root>
        <Title>Setting</Title>
        <Tabs>
          {tabList.map(({ name, value }) => (
            <div className={`item ${currentTab === value ? 'on' : ''}`} onClick={onTabClick(value)} key={value}>{name}</div>
          ))}
        </Tabs>
        <TabContent>
          {currentTab === tabList[0].value && (
            <Personal />
          )}
          {currentTab === tabList[1].value && (
            <Account />
          )}
          </TabContent>
      </Root>
    </Container>
  );
};

export default withRouter(inject("store")(observer(Index)));
